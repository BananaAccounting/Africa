// Copyright [2018] [Banana.ch SA - Lugano Switzerland]
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// @id = ch.banana.app.cashflowrdc
// @api = 1.0
// @pubdate = 2018-11-23
// @publisher = Banana.ch SA
// @description = Cash Flow RDC
// @task = app.command
// @doctype = *.*
// @docproperties =
// @outputformat = none
// @inputdataform = none
// @timeout = -1


/*
   Resume:
   =======
   
   This BananaApp creates a cash flow report for RDC.

   Columns:
   1 = Section
   2 = Group
   3 = Account
   4 = Description
   5 = BClass
   6 = Gr
   7 = Opening
   8 = Debit
   9 = Credit
   10 = Balance
   11 = total (debit-credit)
*/

function exec() {

   /* CURRENT year file:
      the current opened document in Banana */
   var current = Banana.document;
   if (!current) {
      return "@Cancel";
   }

   /* PREVIOUS year file:
      open a dialog window to select the previous year .ac2 file */
   var previous = Banana.application.openDocument("*.*");
   if (!previous) {
      return "@Cancel";
   }

   var report = createReport(current, previous);
   var stylesheet = createStyleSheet();
   Banana.Report.preview(report, stylesheet);
}


/**************************************************************************************
*
* Function that create the report
*
**************************************************************************************/
function createReport(current, previous) {

   // Accounting period for the current year file
   var currentStartDate = current.info("AccountingDataBase","OpeningDate");
   var currentEndDate = current.info("AccountingDataBase","ClosureDate");

   // Accounting period for the previous year file
   var previousStartDate = previous.info("AccountingDataBase","OpeningDate");
   var previousEndDate = previous.info("AccountingDataBase","ClosureDate");

   var report = Banana.Report.newReport("Cash Flow");
   report.addParagraph("TABLEAU DES FLUX DE TRESORERIE","bold center");
   report.addParagraph(" ", "");

   var table = report.addTable("tableCashFlow");
   var col1 = table.addColumn("col1");
   var col2 = table.addColumn("col2");
   var col3 = table.addColumn("col3");
   var col4 = table.addColumn("col4");
   var col5 = table.addColumn("col5");
   var tableRow;
   
   tableRow = table.addRow();
   tableRow.addCell("REF","blackCell bold",1);
   tableRow.addCell("LIBELLES","blackCell bold",1);
   tableRow.addCell("","blackCell bold",1);
   tableRow.addCell("EXERCICE N","blackCell bold",1);
   tableRow.addCell("EXERCICE N-1","blackCell bold",1);

   /* Row 1: ZA */
   ZA_exerciceN = calculate_ZA(current,currentStartDate,currentEndDate);
   ZA_exerciceN1 = calculate_ZA(previous,previousStartDate,previousEndDate);
   tableRow = table.addRow();
   tableRow.addCell("ZA","",1);
   tableRow.addCell("Trésorerie nette au 1er janvier (Trésorerie actif N-1 - trésorerie passif N-1)","bold blackCell",1);
   tableRow.addCell("A","center bold blackCell",1);
   tableRow.addCell(formatValues(ZA_exerciceN),"right bold",1);
   tableRow.addCell(formatValues(ZA_exerciceN1),"right bold",1);

   /* Row 2 */ 
   tableRow = table.addRow();
   tableRow.addCell("","",1);
   tableRow.addCell("Flux de trésorerie provenant des activités opérationnelles","bold",1);
   tableRow.addCell("","",1);
   tableRow.addCell("","right",1);
   tableRow.addCell("","right",1);

   /* Row 3: FA */
   var FA_exerciceN = calculate_FA(current,currentStartDate,currentEndDate);
   var FA_exerciceN1 = calculate_FA(previous,previousStartDate,previousEndDate);
   tableRow = table.addRow();
   tableRow.addCell("FA","",1);
   tableRow.addCell("Capacité d'Autofinancement Globale (CAFG)","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(FA_exerciceN),"right",1);
   tableRow.addCell(formatValues(FA_exerciceN1),"right",1);

   /* Row 4: FB */
   var FB_exerciceN = calculate_FB(current,currentStartDate,currentEndDate);
   var FB_exerciceN1 = calculate_FB(previous,previousStartDate,previousEndDate);
   tableRow = table.addRow();
   tableRow.addCell("FB","",1);
   tableRow.addCell("(-) Variation actif circulant HAO","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(FB_exerciceN),"right",1);
   tableRow.addCell(formatValues(FB_exerciceN1),"right",1);

   /* Row 5: FC */
   var FC_exerciceN = calculate_FC(current,currentStartDate,currentEndDate);
   var FC_exerciceN1 = calculate_FC(previous,previousStartDate,previousEndDate);
   tableRow = table.addRow();
   tableRow.addCell("FC","",1);
   tableRow.addCell("(-) Variation des stocks","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(FC_exerciceN),"right",1);
   tableRow.addCell(formatValues(FC_exerciceN1),"right",1);

   /* Row 6: FD */
   var FD_exerciceN = calculate_FD(current,currentStartDate,currentEndDate);
   var FD_exerciceN1 = calculate_FD(previous,previousStartDate,previousEndDate);
   tableRow = table.addRow();
   tableRow.addCell("FD","",1);
   tableRow.addCell("(-) Variation des créances","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(FD_exerciceN),"right",1);
   tableRow.addCell(formatValues(FD_exerciceN1),"right",1);

   /* Row 7: FE */
   var FE_exerciceN = calculate_FE(current,currentStartDate,currentEndDate);
   var FE_exerciceN1 = calculate_FE(previous,previousStartDate,previousEndDate);
   tableRow = table.addRow();
   tableRow.addCell("FE","",1);
   tableRow.addCell("(+) Variation du passif circulant","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(FE_exerciceN),"right",1);
   tableRow.addCell(formatValues(FE_exerciceN1),"right",1);
   
   /* Row 8: total */
   var exerciceN = calculate_tot_BF(FB_exerciceN,FC_exerciceN,FD_exerciceN,FE_exerciceN);
   var exerciceN1 = calculate_tot_BF(FB_exerciceN1,FC_exerciceN1,FD_exerciceN1,FE_exerciceN1);
   tableRow = table.addRow();
   tableRow.addCell("","",1);
   tableRow.addCell("Variation du BF lié aux activités opérationnelles (FB+FC+FD+FE)","bold",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(exerciceN),"right",1);
   tableRow.addCell(formatValues(exerciceN1),"right",1);

   /* Row 9: total ZB */
   var ZB_exerciceN = calculate_tot_ZB(FA_exerciceN,FB_exerciceN,FC_exerciceN,FD_exerciceN,FE_exerciceN);
   var ZB_exerciceN1 = calculate_tot_ZB(FA_exerciceN1,FB_exerciceN1,FC_exerciceN1,FD_exerciceN1,FE_exerciceN1);
   tableRow = table.addRow();
   tableRow.addCell("ZB","",1);
   tableRow.addCell("Flux de trésorerie provenant des activités opérationnelles (somme FA à FE)","bold blackCell",1);
   tableRow.addCell("B","center bold blackCell",1);
   tableRow.addCell(formatValues(ZB_exerciceN),"right bold",1);
   tableRow.addCell(formatValues(ZB_exerciceN1),"right bold",1);

   /* Row 10 */
   tableRow = table.addRow();
   tableRow.addCell("","",1);
   tableRow.addCell("Flux de trésorerie provenant des activités d'investissements ","bold greyCell",1);
   tableRow.addCell("","greyCell",1);
   tableRow.addCell("","right",1);
   tableRow.addCell("","right",1);

   /* Row 11: FF */
   var FF_exerciceN = calculate_FF(current,currentStartDate,currentEndDate);
   var FF_exerciceN1 = calculate_FF(previous,previousStartDate,previousEndDate);
   tableRow = table.addRow();
   tableRow.addCell("FF","",1);
   tableRow.addCell("Décaissements liés aux acquisitions d'immobilisations incorporelles","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(FF_exerciceN),"right",1);
   tableRow.addCell(formatValues(FF_exerciceN1),"right",1);

   /* Row 12: FG */
   var FG_exerciceN = calculate_FG(current,currentStartDate,currentEndDate);
   var FG_exerciceN1 = calculate_FG(previous,previousStartDate,previousEndDate);
   tableRow = table.addRow();
   tableRow.addCell("FG","",1);
   tableRow.addCell("(-) Décaissements liés aux acquisitions d'immobilisations corporelles","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(FG_exerciceN),"right",1);
   tableRow.addCell(formatValues(FG_exerciceN1),"right",1);

   /* Row 13: FH */
   var FH_exerciceN = calculate_FH(current,currentStartDate,currentEndDate);
   var FH_exerciceN1 = calculate_FH(previous,previousStartDate,previousEndDate);
   tableRow = table.addRow();
   tableRow.addCell("FH","",1);
   tableRow.addCell("Décaissements liés aux acquisitions d'immobilisations financières","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(FH_exerciceN),"right",1);
   tableRow.addCell(formatValues(FH_exerciceN1),"right",1);

   /* Row 14: FI */
   var FI_exerciceN = calculate_FI(current,currentStartDate,currentEndDate);
   var FI_exerciceN1 = calculate_FI(previous,previousStartDate,previousEndDate);
   tableRow = table.addRow();
   tableRow.addCell("FI","",1);
   tableRow.addCell("(+) Encaissements liés aux cessions d'immobilisations incorporelles et corporelles","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(FI_exerciceN),"right",1);
   tableRow.addCell(formatValues(FI_exerciceN1),"right",1);

   /* Row 15: FJ */
   var FJ_exerciceN = calculate_FJ(current,currentStartDate,currentEndDate);
   var FJ_exerciceN1 = calculate_FJ(previous,previousStartDate,previousEndDate);
   tableRow = table.addRow();
   tableRow.addCell("FJ","",1);
   tableRow.addCell("(+) Encaissements liés aux cessions d'immobilisations financières","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(FJ_exerciceN),"right",1);
   tableRow.addCell(formatValues(FJ_exerciceN1),"right",1);

   /* Row 16: total ZC */
   var ZC_exerciceN = calculate_tot_ZC(FF_exerciceN,FG_exerciceN,FH_exerciceN,FI_exerciceN,FJ_exerciceN);
   var ZC_exerciceN1 = calculate_tot_ZC(FF_exerciceN1,FG_exerciceN1,FH_exerciceN1,FI_exerciceN1,FJ_exerciceN1);
   tableRow = table.addRow();
   tableRow.addCell("ZC","",1);
   tableRow.addCell("Flux de trésorerie provenant des activités d'investissement (somme FF à FJ)","bold blackCell",1);
   tableRow.addCell("C","center bold blackCell",1);
   tableRow.addCell(formatValues(ZC_exerciceN),"right bold",1);
   tableRow.addCell(formatValues(ZC_exerciceN1),"right bold",1);

   /* Row 17 */
   tableRow = table.addRow();
   tableRow.addCell("","",1);
   tableRow.addCell("Flux de trésorerie provenant du financement par les capitaux propres","greyCell",1);
   tableRow.addCell("","greyCell",1);
   tableRow.addCell("","right",1);
   tableRow.addCell("","right",1);

   /* Row 18: FK */
   var FK_exerciceN = calculate_FK(current,currentStartDate,currentEndDate);
   var FK_exerciceN1 = calculate_FK(previous,previousStartDate,previousEndDate);
   tableRow = table.addRow();
   tableRow.addCell("FK","",1);
   tableRow.addCell("(+) Augmentations de capital par apports nouveaux","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(FK_exerciceN),"right",1);
   tableRow.addCell(formatValues(FK_exerciceN1),"right",1);

   /* Row 19: FL */
   var FL_exerciceN = calculate_FL(current,currentStartDate,currentEndDate);
   var FL_exerciceN1 = calculate_FL(previous,previousStartDate,previousEndDate);
   tableRow = table.addRow();
   tableRow.addCell("FL","",1);
   tableRow.addCell("(+) Subventions d'investissement reçues","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(FL_exerciceN),"right",1);
   tableRow.addCell(formatValues(FL_exerciceN1),"right",1);

   /* Row 20: FM */
   var FM_exerciceN = calculate_FM(current,currentStartDate,currentEndDate);
   var FM_exerciceN1 = calculate_FM(previous,previousStartDate,previousEndDate);
   tableRow = table.addRow();
   tableRow.addCell("FM","",1);
   tableRow.addCell("(-) Prélèvements sur le capital","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(FM_exerciceN),"right",1);
   tableRow.addCell(formatValues(FM_exerciceN1),"right",1);

   /* Row 21: FN */
   var FN_exerciceN = calculate_FN(current,currentStartDate,currentEndDate);
   var FN_exerciceN1 = calculate_FN(previous,previousStartDate,previousEndDate);
   tableRow = table.addRow();
   tableRow.addCell("FN","",1);
   tableRow.addCell("(-) Dividendes verses","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(FN_exerciceN),"right",1);
   tableRow.addCell(formatValues(FN_exerciceN1),"right",1);

   /* Row 22: total ZD */
   var ZD_exerciceN = calculate_tot_ZD(FK_exerciceN,FL_exerciceN,FM_exerciceN,FN_exerciceN);
   var ZD_exerciceN1 = calculate_tot_ZD(FK_exerciceN1,FL_exerciceN1,FM_exerciceN1,FN_exerciceN1);
   tableRow = table.addRow();
   tableRow.addCell("ZD","",1);
   tableRow.addCell("Flux de trésorerie provenant des capitaux propres (somme FK à FN)","bold blackCell",1);
   tableRow.addCell("D","center bold blackCell",1);
   tableRow.addCell(formatValues(ZD_exerciceN),"right bold",1);
   tableRow.addCell(formatValues(ZD_exerciceN1),"right bold",1);

   /* Row 23 */
   tableRow = table.addRow();
   tableRow.addCell("","",1);
   tableRow.addCell("Trésorerie provenant du financement par les capitaux étrangers","bold greyCell",1);
   tableRow.addCell("","greyCell",1);
   tableRow.addCell("","right",1);
   tableRow.addCell("","right",1);

   /* Row 24: FO */
   var FO_exerciceN = calculate_FO(current,currentStartDate,currentEndDate);
   var FO_exerciceN1 = calculate_FO(previous,previousStartDate,previousEndDate);
   tableRow = table.addRow();
   tableRow.addCell("FO","",1);
   tableRow.addCell("(+) Emprunts","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(FO_exerciceN),"right",1);
   tableRow.addCell(formatValues(FO_exerciceN1),"right",1);

   /* Row 25: FP */
   var FP_exerciceN = calculate_FP(current,currentStartDate,currentEndDate);
   var FP_exerciceN1 = calculate_FP(previous,previousStartDate,previousEndDate);
   tableRow = table.addRow();
   tableRow.addCell("FP","",1);
   tableRow.addCell("(+) Autres dettes financières","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(FP_exerciceN),"right",1);
   tableRow.addCell(formatValues(FP_exerciceN1),"right",1);

   /* Row 26: FQ */
   var FQ_exerciceN = calculate_FQ(current,currentStartDate,currentEndDate);
   var FQ_exerciceN1 = calculate_FQ(previous,previousStartDate,previousEndDate);
   tableRow = table.addRow();
   tableRow.addCell("FQ","",1);
   tableRow.addCell("(-) Remboursements des emprunts et autres dettes financières","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(FQ_exerciceN),"right",1);
   tableRow.addCell(formatValues(FQ_exerciceN1),"right",1);

   /* Row 27: ZE */
   var ZE_exerciceN = calculate_tot_ZE(FO_exerciceN,FP_exerciceN,FQ_exerciceN);
   var ZE_exerciceN1 = calculate_tot_ZE(FO_exerciceN1,FP_exerciceN1,FQ_exerciceN1);
   tableRow = table.addRow();
   tableRow.addCell("ZE","",1);
   tableRow.addCell("Flux de trésorerie provenant des capitaux étrangers (somme FO à FQ)","bold blackCell",1);
   tableRow.addCell("E","center bold blackCell",1);
   tableRow.addCell(formatValues(ZE_exerciceN),"right bold",1);
   tableRow.addCell(formatValues(ZE_exerciceN1),"right bold",1);

   /* Row 28: ZF */
   var ZF_exerciceN = calculate_tot_ZF(ZD_exerciceN,ZE_exerciceN);
   var ZF_exerciceN1 = calculate_tot_ZF(ZD_exerciceN1,ZE_exerciceN1);
   tableRow = table.addRow();
   tableRow.addCell("ZF","",1);
   tableRow.addCell("Flux de trésorerie provenant des activités de financement (D+E)","bold blackCell",1);
   tableRow.addCell("F","center bold blackCell",1);
   tableRow.addCell(formatValues(ZF_exerciceN),"right bold",1);
   tableRow.addCell(formatValues(ZF_exerciceN1),"right bold",1);

   /* Row 29: ZG */
   var ZG_exerciceN = calculate_tot_ZG(ZB_exerciceN,ZC_exerciceN,ZF_exerciceN);
   var ZG_exerciceN1 = calculate_tot_ZG(ZB_exerciceN1,ZC_exerciceN1,ZF_exerciceN1);
   tableRow = table.addRow();
   tableRow.addCell("ZG","",1);
   tableRow.addCell("VARIATION DE LA TRESORERIE NETTE DE LA PERIODE (B+C+F)","bold",1);
   tableRow.addCell("G","center bold",1);
   tableRow.addCell(formatValues(ZG_exerciceN),"right bold",1);
   tableRow.addCell(formatValues(ZG_exerciceN1),"right bold",1);

   /* Row 30: ZH */
   var ZH_exerciceN = calculate_tot_ZH(ZG_exerciceN,ZA_exerciceN);
   var ZH_exerciceN1 = calculate_tot_ZH(ZG_exerciceN1,ZA_exerciceN1);
   tableRow = table.addRow();
   tableRow.addCell("ZH","",1);
   tableRow.addCell("Trésorerie nette au 31 Décembre (G+A) Contrôle : Trésorerie actif N - trésorerie passif N =","bold blackCell",1);
   tableRow.addCell("H","center bold blackCell",1);
   tableRow.addCell(formatValues(ZH_exerciceN),"right bold",1);
   tableRow.addCell(formatValues(ZH_exerciceN1),"right bold",1);

   return report;
}


/**************************************************************************************
*
* Functions that calculate the data for the report
*
**************************************************************************************/

function calculate_ZA(banDoc, startDate, endDate) {
   /*
      Gr=BT,opening - Gr=DT,opening

      100-40 = 60
   */
   var grBT = getAmount(banDoc,'Gr=BT','opening',startDate,endDate);
   var grDT = getAmount(banDoc,'Gr=DT','opening',startDate,endDate);
   return Banana.SDecimal.subtract(grBT,grDT);
}

function calculate_FA(banDoc, startDate, endDate) {
   /*
      + Gr=134, total
      + account 6541, total 
      + account 6542, total
      - account 7541, total
      - account 7542, total
      + Gr=136, total
      + Gr=TO, total
      - Gr=RP, total
      - Gr=RQ, total
      - Gr=RS, total

      12
      2
      3
      -4
      -5
      6
      7
      -8
      -9
      -10
      ===
      -6
   */
   var gr134 = getAmount(banDoc,'Gr=134','total',startDate,endDate);
   var acc6541 = getAmount(banDoc,'6541','total',startDate,endDate);
   var acc6542 = getAmount(banDoc,'6542','total',startDate,endDate);
   var acc7541 = getAmount(banDoc,'7541','total',startDate,endDate);
   var acc7542 = getAmount(banDoc,'7542','total',startDate,endDate);
   var gr136 = getAmount(banDoc,'Gr=136','total',startDate,endDate);
   var grTO = getAmount(banDoc,'Gr=TO','total',startDate,endDate);
   var grRP = getAmount(banDoc,'Gr=RP','total',startDate,endDate);
   var grRQ = getAmount(banDoc,'Gr=RQ','total',startDate,endDate);
   var grRS = getAmount(banDoc,'Gr=RS','total',startDate,endDate);
   var res = 0;
   res = Banana.SDecimal.add(res,gr134);
   res = Banana.SDecimal.add(res,acc6541);
   res = Banana.SDecimal.add(res,acc6542);
   res = Banana.SDecimal.subtract(res,acc7541);
   res = Banana.SDecimal.subtract(res,acc7542);
   res = Banana.SDecimal.add(res,gr136);
   res = Banana.SDecimal.add(res,grTO);
   res = Banana.SDecimal.subtract(res,grRP);
   res = Banana.SDecimal.subtract(res,grRQ);
   res = Banana.SDecimal.subtract(res,grRS);
   return res;
}

function calculate_FB(banDoc, startDate, endDate) {
   /*
      account 488, total

      3 
   */
   return getAmount(banDoc,'488','total',startDate,endDate);
}

function calculate_FC(banDoc, startDate, endDate) {
   /*
      Gr=BB, total 

      8
   */
   return getAmount(banDoc,'Gr=BB','total',startDate,endDate);
}

function calculate_FD(banDoc, startDate, endDate) {
   /* 
      + Gr=BG,total
      - account 4141, debit
      - account 4142, debit
      - account 4146, debit
      - account 4147, debit
      - account 467, debit
      - account 4581, total
      - account 4582, total
      - account 4494, total

      -88
      -3
      -4
      -5
      -6
      -7
      -(-12)
      -(-11)
      -(-10)
      ====
      -80
   */   
   var grBG = getAmount(banDoc,'Gr=BG','total',startDate,endDate);
   var acc4141 = getAmount(banDoc,'4141','debit',startDate,endDate);
   var acc4142 = getAmount(banDoc,'4142','debit',startDate,endDate);
   var acc4146 = getAmount(banDoc,'4146','debit',startDate,endDate);
   var acc4147 = getAmount(banDoc,'4147','debit',startDate,endDate);
   var acc467 = getAmount(banDoc,'467','debit',startDate,endDate);
   var acc4581 = getAmount(banDoc,'4581','total',startDate,endDate);
   var acc4582 = getAmount(banDoc,'4582','total',startDate,endDate);
   var acc4494 = getAmount(banDoc,'4494','total',startDate,endDate);
   var res = 0;
   res = Banana.SDecimal.add(res,grBG);
   res = Banana.SDecimal.subtract(res,acc4141);
   res = Banana.SDecimal.subtract(res,acc4142);
   res = Banana.SDecimal.subtract(res,acc4146);
   res = Banana.SDecimal.subtract(res,acc4147);
   res = Banana.SDecimal.subtract(res,acc467);
   res = Banana.SDecimal.subtract(res,acc4581);
   res = Banana.SDecimal.subtract(res,acc4582);
   res = Banana.SDecimal.subtract(res,acc4494);
   return res;
}

function calculate_FE(banDoc, startDate, endDate) {
   /*
      + Gr=DP, total
      + account 479, credit
      - account 4041, credit
      - account 4042, credit
      - account 4046, credit
      - account 4047, credit
      
      +1
      +10
      -5
      -4
      -3
      -2
      ===
      -3
   */

   var grDP = getAmount(banDoc,'Gr=DP','total',startDate,endDate);
   var acc479 = getAmount(banDoc,'479','credit',startDate,endDate);
   var acc4041 = getAmount(banDoc,'4041','credit',startDate,endDate);
   var acc4042 = getAmount(banDoc,'4042','credit',startDate,endDate);
   var acc4046 = getAmount(banDoc,'4046','credit',startDate,endDate);
   var acc4047 = getAmount(banDoc,'4047','credit',startDate,endDate);
   var res = 0;
   res = Banana.SDecimal.add(res,grDP);
   res = Banana.SDecimal.add(res,acc479);
   res = Banana.SDecimal.subtract(res,acc4041);
   res = Banana.SDecimal.subtract(res,acc4042);
   res = Banana.SDecimal.subtract(res,acc4046);
   res = Banana.SDecimal.subtract(res,acc4047);
   return res;
}

function calculate_FF(banDoc, startDate, endDate) {
   /*
      + Gr=AE-1, debit
      + Gr=AF-1, debit
      + Gr=AG-1, debit
      + Gr=AH-1, debit
      + account 251, debit
      - account 4811, total
      - account 4821, total
      - account 4041, total
      - account 4046, total
      - account 251, credit

      +10
      +2
      +3
      +4
      +5
      -(-4)
      -(-3)
      -5
      -7
      -10
      =====
      9
   */

   var grAE1 = getAmount(banDoc,'Gr=AE-1','debit',startDate,endDate);
   var grAF1 = getAmount(banDoc,'Gr=AF-1','debit',startDate,endDate);
   var grAG1 = getAmount(banDoc,'Gr=AG-1','debit',startDate,endDate);
   var grAH1 = getAmount(banDoc,'Gr=AH-1','debit',startDate,endDate);
   var acc251 = getAmount(banDoc,'251','debit',startDate,endDate);
   var acc4811 = getAmount(banDoc,'4811','total',startDate,endDate);
   var acc4821 = getAmount(banDoc,'4821','total',startDate,endDate);
   var acc4041 = getAmount(banDoc,'4041','total',startDate,endDate);
   var acc4046 = getAmount(banDoc,'4046','total',startDate,endDate);
   var acc251_c = getAmount(banDoc,'251','credit',startDate,endDate);
   var res = 0;
   res = Banana.SDecimal.add(res,grAE1);
   res = Banana.SDecimal.add(res,grAF1);
   res = Banana.SDecimal.add(res,grAG1);
   res = Banana.SDecimal.add(res,grAH1);
   res = Banana.SDecimal.add(res,acc251);
   res = Banana.SDecimal.subtract(res,acc4811);
   res = Banana.SDecimal.subtract(res,acc4821);
   res = Banana.SDecimal.subtract(res,acc4041);
   res = Banana.SDecimal.subtract(res,acc4046);
   res = Banana.SDecimal.subtract(res,acc251_c);
   return res;
}

function calculate_FG(banDoc, startDate, endDate) {
   /*
      + Gr=AJ-1, debit
      + Gr=AK-1, debit
      + Gr=AL-1, debit
      + Gr=AM-1, debit
      + Gr=AN-1, debit
      + account 252, debit
      - account 4812, total
      - account 4822, total
      - account 4042, total
      - account 4047, total
      - account 252, credit
      - account 172, credit
      - account 173, credit
      - account 174, credit

      +9
      +8
      +7
      +6
      +5
      +4
      -(-7)
      -(-8)
      -6
      -8
      -10
      -9
      -8
      -7
      ====
      6
   */

   var grAJ1 = getAmount(banDoc,'Gr=AJ-1','debit',startDate,endDate);
   var grAK1 = getAmount(banDoc,'Gr=AK-1','debit',startDate,endDate);
   var grAL1 = getAmount(banDoc,'Gr=AL-1','debit',startDate,endDate);
   var grAM1 = getAmount(banDoc,'Gr=AM-1','debit',startDate,endDate);
   var grAN1 = getAmount(banDoc,'Gr=AN-1','debit',startDate,endDate);
   var acc252_d = getAmount(banDoc,'252','debit',startDate,endDate);
   var acc4812 = getAmount(banDoc,'4812','total',startDate,endDate);
   var acc4822 = getAmount(banDoc,'4822','total',startDate,endDate);
   var acc4042 = getAmount(banDoc,'4042','total',startDate,endDate);
   var acc4047 = getAmount(banDoc,'4047','total',startDate,endDate);
   var acc252_c = getAmount(banDoc,'252','credit',startDate,endDate);
   var acc172 = getAmount(banDoc,'172','credit',startDate,endDate);
   var acc173 = getAmount(banDoc,'173','credit',startDate,endDate);
   var acc174 = getAmount(banDoc,'174','credit',startDate,endDate);
   var res = 0;
   res = Banana.SDecimal.add(res,grAJ1);
   res = Banana.SDecimal.add(res,grAK1);
   res = Banana.SDecimal.add(res,grAL1);
   res = Banana.SDecimal.add(res,grAM1);
   res = Banana.SDecimal.add(res,grAN1);
   res = Banana.SDecimal.add(res,acc252_d);
   res = Banana.SDecimal.subtract(res,acc4812);
   res = Banana.SDecimal.subtract(res,acc4822);
   res = Banana.SDecimal.subtract(res,acc4042);
   res = Banana.SDecimal.subtract(res,acc4047);
   res = Banana.SDecimal.subtract(res,acc252_c);
   res = Banana.SDecimal.subtract(res,acc172);
   res = Banana.SDecimal.subtract(res,acc173);
   res = Banana.SDecimal.subtract(res,acc174);
   return res;
}

function calculate_FH(banDoc, startDate, endDate) {
   /*
      + Gr=AR-1, debit
      + Gr=AS-1, debit
      - account 4813, credit

      +2
      +3
      -10
      ====
      -5
   */

   var grAR1 = getAmount(banDoc,'Gr=AR-1','debit',startDate,endDate);
   var grAS1 = getAmount(banDoc,'Gr=AS-1','debit',startDate,endDate);
   var acc4813 = getAmount(banDoc,'4813','credit',startDate,endDate);
   var res = 0;
   res = Banana.SDecimal.add(res,grAR1);
   res = Banana.SDecimal.add(res,grAS1);
   res = Banana.SDecimal.subtract(res,acc4813);
   return res;
}

function calculate_FI(banDoc, startDate, endDate) {
   /*
      + account 7541, credit
      + account 7542, credit
      + account 821, credit
      + account 822, credit
      - account 4851, total
      - account 4852, total
      - account 4141, total
      - account 4142, total
      - account 4146, total
      - account 4147, total
      
      +26
      +35
      +1
      +2
      -8
      -9
      -(-17)
      -(-16)
      -(-15)
      -(-14)
      ======
      109
   */

   var acc7541 = getAmount(banDoc,'7541','credit',startDate,endDate);
   var acc7542 = getAmount(banDoc,'7542','credit',startDate,endDate);
   var acc821 = getAmount(banDoc,'821','credit',startDate,endDate);
   var acc822 = getAmount(banDoc,'822','credit',startDate,endDate);
   var acc4851 = getAmount(banDoc,'4851','total',startDate,endDate);
   var acc4852 = getAmount(banDoc,'4852','total',startDate,endDate);
   var acc4141 = getAmount(banDoc,'4141','total',startDate,endDate);
   var acc4142 = getAmount(banDoc,'4142','total',startDate,endDate);
   var acc4146 = getAmount(banDoc,'4146','total',startDate,endDate);
   var acc4147 = getAmount(banDoc,'4147','total',startDate,endDate);
   var res = 0;
   res = Banana.SDecimal.add(res,acc7541);
   res = Banana.SDecimal.add(res,acc7542);
   res = Banana.SDecimal.add(res,acc821);
   res = Banana.SDecimal.add(res,acc822);
   res = Banana.SDecimal.subtract(res,acc4851);
   res = Banana.SDecimal.subtract(res,acc4852);
   res = Banana.SDecimal.subtract(res,acc4141);
   res = Banana.SDecimal.subtract(res,acc4142);
   res = Banana.SDecimal.subtract(res,acc4146);
   res = Banana.SDecimal.subtract(res,acc4147);
   return res;
}

function calculate_FJ(banDoc, startDate, endDate) {
   /*
      account 6542, credit

      7
   */
   return getAmount(banDoc,'6542','credit',startDate,endDate);
}

function calculate_FK(banDoc, startDate, endDate) {
   /*
      + Gr=CA, total
      - Gr=CB, total
      - Gr=CE, total
      - account 467, total
      - account 4581, total

      +93
      -9
      -8
      -(-13)
      -(-12)
      ======
      101

   */
   var grCA = getAmount(banDoc,'Gr=CA','total',startDate,endDate);
   var grCB = getAmount(banDoc,'Gr=CB','total',startDate,endDate);
   var grCE = getAmount(banDoc,'Gr=CE','total',startDate,endDate);
   var acc467 = getAmount(banDoc,'467','total',startDate,endDate);
   var acc4581 = getAmount(banDoc,'4581','total',startDate,endDate);
   var res = 0;
   res = Banana.SDecimal.add(res,grCA);
   res = Banana.SDecimal.subtract(res,grCB);
   res = Banana.SDecimal.subtract(res,grCE);
   res = Banana.SDecimal.subtract(res,acc467);
   res = Banana.SDecimal.subtract(res,acc4581);
   return res;
}

function calculate_FL(banDoc, startDate, endDate) {
   /*
      + Gr=CL, total
      - account 4582, total
      - account 4494, total
      - Gr=TJ, total

      +8
      -(-11)
      -(-10)
      -2
      ======
      27
   */

   var grCL = getAmount(banDoc,'Gr=CL','total',startDate,endDate);
   var acc4582 = getAmount(banDoc,'4582','total',startDate,endDate);
   var acc4494 = getAmount(banDoc,'4494','total',startDate,endDate);
   var grTJ = getAmount(banDoc,'Gr=TJ','total',startDate,endDate);
   var res = 0;
   res = Banana.SDecimal.add(res,grCL);
   res = Banana.SDecimal.subtract(res,acc4582);
   res = Banana.SDecimal.subtract(res,acc4494);
   res = Banana.SDecimal.subtract(res,grTJ);
   return res;
}

function calculate_FM(banDoc, startDate, endDate) {
   /*
      account 4619, debit
      
      10
   */
   return getAmount(banDoc,'4619','debit',startDate,endDate);
}

function calculate_FN(banDoc, startDate, endDate) {
   /*
      account 465, debit
      
      5
   */
   return getAmount(banDoc,'465','debit',startDate,endDate);
}

function calculate_FO(banDoc, startDate, endDate) {
   /*
      + account 161, credit
      + account 162, credit
      + account 163, credit
      + account 164, credit
      + account 165, credit
      + account 166, credit
      + account 167, credit
      + account 181, credit
      
      +5
      +6
      +7
      +8
      +9
      +10
      +11
      +12
      ====
      68
   */
   var acc161 = getAmount(banDoc,'161','credit',startDate,endDate);
   var acc162 = getAmount(banDoc,'162','credit',startDate,endDate);
   var acc163 = getAmount(banDoc,'163','credit',startDate,endDate);
   var acc164 = getAmount(banDoc,'164','credit',startDate,endDate);
   var acc165 = getAmount(banDoc,'165','credit',startDate,endDate);
   var acc166 = getAmount(banDoc,'166','credit',startDate,endDate);
   var acc167 = getAmount(banDoc,'167','credit',startDate,endDate);
   var acc181 = getAmount(banDoc,'181','credit',startDate,endDate);
   var res = 0;
   res = Banana.SDecimal.add(res,acc161);
   res = Banana.SDecimal.add(res,acc162);
   res = Banana.SDecimal.add(res,acc163);
   res = Banana.SDecimal.add(res,acc164);
   res = Banana.SDecimal.add(res,acc165);
   res = Banana.SDecimal.add(res,acc166);
   res = Banana.SDecimal.add(res,acc167);
   res = Banana.SDecimal.add(res,acc181);
   return res;
}

function calculate_FP(banDoc, startDate, endDate) {
   /*
      account 168, credit

      7
   */
   return getAmount(banDoc,'168','credit',startDate,endDate);
}

function calculate_FQ(banDoc, startDate, endDate) {
   /*
      + account 161, debit
      + account 162, debit
      + account 163, debit
      + account 164, debit
      + account 165, debit
      + account 166, debit
      + account 167, debit
      + account 181, debit
      + account 172, debit
      + account 173, debit
      + account 174, debit
      + account 176, debit

      +5
      +4
      +5
      +6
      +7
      +8
      +9
      +10
      +2
      +2
      +2
      +5
      ====
      65
   */
   var acc161 = getAmount(banDoc,'161','debit',startDate,endDate);
   var acc162 = getAmount(banDoc,'162','debit',startDate,endDate);
   var acc163 = getAmount(banDoc,'163','debit',startDate,endDate);
   var acc164 = getAmount(banDoc,'164','debit',startDate,endDate);
   var acc165 = getAmount(banDoc,'165','debit',startDate,endDate);
   var acc166 = getAmount(banDoc,'166','debit',startDate,endDate);
   var acc167 = getAmount(banDoc,'167','debit',startDate,endDate);
   var acc181 = getAmount(banDoc,'181','debit',startDate,endDate);
   var acc172 = getAmount(banDoc,'172','debit',startDate,endDate);
   var acc173 = getAmount(banDoc,'173','debit',startDate,endDate);
   var acc174 = getAmount(banDoc,'174','debit',startDate,endDate);
   var acc176 = getAmount(banDoc,'176','debit',startDate,endDate);
   var res = 0;
   res = Banana.SDecimal.add(res,acc161);
   res = Banana.SDecimal.add(res,acc162);
   res = Banana.SDecimal.add(res,acc163);
   res = Banana.SDecimal.add(res,acc164);
   res = Banana.SDecimal.add(res,acc165);
   res = Banana.SDecimal.add(res,acc166);
   res = Banana.SDecimal.add(res,acc167);
   res = Banana.SDecimal.add(res,acc181);
   res = Banana.SDecimal.add(res,acc172);
   res = Banana.SDecimal.add(res,acc173);
   res = Banana.SDecimal.add(res,acc174);
   res = Banana.SDecimal.add(res,acc176);
   return res;
}

/* Totals */
function calculate_tot_BF(FB,FC,FD,FE) {
   /*
      FB + FC + FD + FE

      3+8-80-3 = -72
   */
   var res = 0;
   res = Banana.SDecimal.add(res,FB);
   res = Banana.SDecimal.add(res,FC);
   res = Banana.SDecimal.add(res,FD);
   res = Banana.SDecimal.add(res,FE);
   return res;
}

function calculate_tot_ZB(FA,FB,FC,FD,FE) {
   /*
      FA + FB + FC + FD + FE
      
      -6+3+8-80-3 = -78
   */
   var res = 0;
   res = Banana.SDecimal.add(res,FA);
   res = Banana.SDecimal.add(res,FB);
   res = Banana.SDecimal.add(res,FC);
   res = Banana.SDecimal.add(res,FD);
   res = Banana.SDecimal.add(res,FE);  
   return res;
}

function calculate_tot_ZC(FF,FG,FH,FI,FJ) {
   /*
      FF + FG + FH + FI + FJ

      9+6-5+109+7 = 126
   */
   var res = 0;
   res = Banana.SDecimal.add(res,FF);
   res = Banana.SDecimal.add(res,FG);
   res = Banana.SDecimal.add(res,FH);
   res = Banana.SDecimal.add(res,FI);
   res = Banana.SDecimal.add(res,FJ);
   return res;
}

function calculate_tot_ZD(FK,FL,FM,FN) {
   /*
      FK + FL + FM + FN

      101+27+10+5=143
   */
   var res = 0;
   res = Banana.SDecimal.add(res,FK);
   res = Banana.SDecimal.add(res,FL);
   res = Banana.SDecimal.add(res,FM);
   res = Banana.SDecimal.add(res,FN);
   return res;
}

function calculate_tot_ZE(FO,FP,FQ) {
   /*
      FO + FP + FQ

      68+7+65=140
   */
   var res = 0;
   res = Banana.SDecimal.add(res,FO);
   res = Banana.SDecimal.add(res,FP);
   res = Banana.SDecimal.add(res,FQ);
   return res;
}

function calculate_tot_ZF(ZD,ZE) {
   /*
      ZD + ZE

      143+140=283
   */
   var res = 0;
   res = Banana.SDecimal.add(res,ZD);
   res = Banana.SDecimal.add(res,ZE);
   return res;
}

function calculate_tot_ZG(ZB,ZC,ZF) {
   /*
      ZB + ZC + ZF

      -78+126+283=331
   */
   var res = 0;
   res = Banana.SDecimal.add(res,ZB);
   res = Banana.SDecimal.add(res,ZC);
   res = Banana.SDecimal.add(res,ZF);
   return res;
}

function calculate_tot_ZH(ZG,ZA) {
   /*
      ZG + ZA

      331+60=391
   */
   var res = 0;
   res = Banana.SDecimal.add(res,ZG);
   res = Banana.SDecimal.add(res,ZA);
   return res;
}


/**************************************************************************************
*
* Functions that retrieve and format values from Banana
*
**************************************************************************************/

function getAmount(current,group,propriety,startDate,endDate) {
   var currentBal = current.currentBalance(group,startDate,endDate)
   var value = currentBal[propriety];
   return value;
}

function formatValues(value) {
   if (!value || value === "0" || value == null) {
      value = "0";
   }
   return Banana.Converter.toLocaleNumberFormat(value);
}


/**************************************************************************************
*
* Styles
*
**************************************************************************************/

function createStyleSheet() {
   var stylesheet = Banana.Report.newStyleSheet();

   stylesheet.addStyle("@page", "margin:20mm 10mm 10mm 20mm;") 
   stylesheet.addStyle("body", "font-family:Helvetica; font-size:9pt");
   stylesheet.addStyle(".bold", "font-weight:bold;");
   stylesheet.addStyle(".right", "text-align:right;");
   stylesheet.addStyle(".center", "text-align:center");

   style = stylesheet.addStyle(".blackCell");
   style.setAttribute("background-color", "black");
   style.setAttribute("color","white");

   style = stylesheet.addStyle(".greyCell");
   style.setAttribute("background-color", "#C0C0C0");

   /* table */
   var tableStyle = stylesheet.addStyle(".tableCashFlow");
   tableStyle.setAttribute("width", "100%");
   stylesheet.addStyle(".col1", "width:5%");
   stylesheet.addStyle(".col2", "width:60%");
   stylesheet.addStyle(".col3", "width:5%");
   stylesheet.addStyle(".col4", "width:15%");
   stylesheet.addStyle(".col5", "width:15%");
   stylesheet.addStyle("table.tableCashFlow td", "border:thin solid black;padding-bottom:2px;padding-top:5px");

   return stylesheet;
}
