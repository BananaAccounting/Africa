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
// @id = ch.banana.africa.balancesheetrdc
// @api = 1.0
// @pubdate = 2018-12-14
// @publisher = Banana.ch SA
// @description = Balance sheet  Report (OHADA - RDC) [BETA]
// @description.fr = Bilan (OHADA - RDC) [BETA]
// @task = app.command
// @doctype = *.*
// @docproperties =
// @outputformat = none
// @inputdataform = none
// @timeout = -1


/*
   Resume:
   =======
   
   This BananaApp creates a Balance sheet report for RDC.
   - Active Balance sheet
   - Passive Balance sheet

*/

function exec() {

   /* CURRENT year file:
      the current opened document in Banana */
   var current = Banana.document;
   if (!current) {
      return "@Cancel";
   }

   var report = createReport(current);
   var stylesheet = createStyleSheet();
   Banana.Report.preview(report, stylesheet);
}


/**************************************************************************************
*
* Function that create the report
*
**************************************************************************************/
function monthDiff(d1, d2) {
   if (d2 < d1) { 
      var dTmp = d2;
      d2 = d1;
      d1 = dTmp;
   }
   var months = (d2.getFullYear() - d1.getFullYear()) * 12;
   months -= d1.getMonth(); //+1
   months += d2.getMonth();

   if (d1.getDate() <= d2.getDate()) {
      months += 1;
   }
   return months;
}

function createReport(current) {

   // Accounting period for the current year file
   var currentStartDate = current.info("AccountingDataBase","OpeningDate");
   var currentEndDate = current.info("AccountingDataBase","ClosureDate");
   var currentYear = Banana.Converter.toDate(currentStartDate).getFullYear();
   var previousYear = currentYear-1;
   var company = current.info("AccountingDataBase","Company");
   var months = monthDiff(Banana.Converter.toDate(currentEndDate), Banana.Converter.toDate(currentStartDate));
   var fiscalNumber = current.info("AccountingDataBase","FiscalNumber");
   var vatNumber = current.info("AccountingDataBase","VatNumber");

   var report = Banana.Report.newReport("Bilan");
   var paragraph;

   // Header of the report
   paragraph = report.addParagraph("","");
   paragraph.addText("Désignation de l'entité: ", "bold");
   if (company) {
      paragraph.addText(company, "");
   }

   paragraph = report.addParagraph();
   paragraph.addText("Exercice clos ", "bold");
   paragraph.addText("le " + Banana.Converter.toLocaleDateFormat(currentEndDate), "");

   paragraph = report.addParagraph();
   paragraph.addText("Numéro d'identification: ", "bold");
   if (fiscalNumber) {
      paragraph.addText(fiscalNumber,"");
   }

   paragraph = report.addParagraph();
   paragraph.addText("Durée (en mois): ", "bold");
   paragraph.addText(months, "");

   paragraph = report.addParagraph();
   paragraph.addText("RCCM: ", "bold");
   if (vatNumber) {
      paragraph.addText(vatNumber,"");
   }


   /*******************************************************************************************
   *  1. Active Balance sheet
   *******************************************************************************************/
   report.addParagraph(" ", "");
   report.addParagraph(" ", "");
   report.addParagraph("BILAN ACTIF AU 31 DECEMBRE " + currentYear,"bold center");
   report.addParagraph(" ", "");

   // Table with cash flow data
   var table = report.addTable("tableCashFlow");
   var col1 = table.addColumn("col1");
   var col2 = table.addColumn("col2");
   var col3 = table.addColumn("col3");
   var col4 = table.addColumn("col4");
   var col5 = table.addColumn("col5");
   var col6 = table.addColumn("col6");
   var col7 = table.addColumn("col7");
   var tableRow;
   
   tableRow = table.addRow();
   tableRow.addCell("REF","blackCell bold",1);
   tableRow.addCell("ACTIF","blackCell bold",1);
   tableRow.addCell("Note","blackCell bold",1);
   tableRow.addCell("BRUT " + currentYear,"blackCell bold",1);
   tableRow.addCell("AMORT et DEPREC. " + currentYear,"blackCell bold",1);
   tableRow.addCell("NET " + currentYear,"blackCell bold",1);
   tableRow.addCell("EXERCICE AU 31/12/" + previousYear,"blackCell bold",1);

   /* Row 1: AD */
   tableRow = table.addRow();
   tableRow.addCell("AD","",1);
   tableRow.addCell("IMMOBILISATIONS INCORPORELLES","blackCell bold",1);
   tableRow.addCell("3","blackCell bold",1);
   tableRow.addCell("","blackCell bold",1);
   tableRow.addCell("","blackCell bold",1);
   tableRow.addCell("","blackCell bold",1);
   tableRow.addCell("","blackCell bold",1);

   /* Row 2: AE */
   var AE1_exerciceN = getAmount(current,'Gr=AE-1','balance',currentStartDate,currentEndDate);
   var AE2_exerciceN = getAmount(current,'Gr=AE-2','balance',currentStartDate,currentEndDate);
   var AE_exerciceN = getAmount(current,'Gr=AE','balance',currentStartDate,currentEndDate);
   var AE_exerciceN1 = getAmount(current,'Gr=AE','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("AE","",1);
   tableRow.addCell("Frais de développement et de prospection","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(AE1_exerciceN),"right",1);
   tableRow.addCell(formatValues(AE2_exerciceN),"right",1);
   tableRow.addCell(formatValues(AE_exerciceN),"right",1);
   tableRow.addCell(formatValues(AE_exerciceN1),"right",1);

   /* Row 3: AF */
   var AF1_exerciceN = getAmount(current,'Gr=AF-1','balance',currentStartDate,currentEndDate);
   var AF2_exerciceN = getAmount(current,'Gr=AF-2','balance',currentStartDate,currentEndDate);
   var AF_exerciceN = getAmount(current,'Gr=AF','balance',currentStartDate,currentEndDate);
   var AF_exerciceN1 = getAmount(current,'Gr=AF','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("AF","",1);
   tableRow.addCell("Brevets, licences, logiciels, et  droits similaires","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(AF1_exerciceN),"right",1);
   tableRow.addCell(formatValues(AF2_exerciceN),"right",1);
   tableRow.addCell(formatValues(AF_exerciceN),"right",1);
   tableRow.addCell(formatValues(AF_exerciceN1),"right",1);

   /* Row 4: AG */
   var AG1_exerciceN = getAmount(current,'Gr=AG-1','balance',currentStartDate,currentEndDate);
   var AG2_exerciceN = getAmount(current,'Gr=AG-2','balance',currentStartDate,currentEndDate);
   var AG_exerciceN = getAmount(current,'Gr=AG','balance',currentStartDate,currentEndDate);
   var AG_exerciceN1 = getAmount(current,'Gr=AG','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("AG","",1);
   tableRow.addCell("Fonds commercial et droit au bail","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(AG1_exerciceN),"right",1);
   tableRow.addCell(formatValues(AG2_exerciceN),"right",1);
   tableRow.addCell(formatValues(AG_exerciceN),"right",1);
   tableRow.addCell(formatValues(AG_exerciceN1),"right",1);

   /* Row 5: AH */
   var AH1_exerciceN = getAmount(current,'Gr=AH-1','balance',currentStartDate,currentEndDate);
   var AH2_exerciceN = getAmount(current,'Gr=AH-2','balance',currentStartDate,currentEndDate);
   var AH_exerciceN = getAmount(current,'Gr=AH','balance',currentStartDate,currentEndDate);
   var AH_exerciceN1 = getAmount(current,'Gr=AH','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("AH","",1);
   tableRow.addCell("Autres immobilisations incorporelles","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(AH1_exerciceN),"right",1);
   tableRow.addCell(formatValues(AH2_exerciceN),"right",1);
   tableRow.addCell(formatValues(AH_exerciceN),"right",1);
   tableRow.addCell(formatValues(AH_exerciceN1),"right",1);

   /* Row 6: AI */
   tableRow = table.addRow();
   tableRow.addCell("AI","",1);
   tableRow.addCell("IMMOBILISATIONS CORPORELLES","blackCell bold",1);
   tableRow.addCell("3","blackCell bold",1);
   tableRow.addCell("","blackCell bold",1);
   tableRow.addCell("","blackCell bold",1);
   tableRow.addCell("","blackCell bold",1);
   tableRow.addCell("","blackCell bold",1);
   
   /* Row 7: AJ */
   var AJ1_exerciceN = getAmount(current,'Gr=AJ-1','balance',currentStartDate,currentEndDate);
   var AJ2_exerciceN = getAmount(current,'Gr=AJ-2','balance',currentStartDate,currentEndDate);
   var AJ_exerciceN = getAmount(current,'Gr=AJ','balance',currentStartDate,currentEndDate);
   var AJ_exerciceN1 = getAmount(current,'Gr=AJ','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("AJ","",1);
   tableRow.addCell("Terrains (1) dont Placement en  Net......./.......","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(AJ1_exerciceN),"right",1);
   tableRow.addCell(formatValues(AJ2_exerciceN),"right",1);
   tableRow.addCell(formatValues(AJ_exerciceN),"right",1);
   tableRow.addCell(formatValues(AJ_exerciceN1),"right",1);

   /* Row 8: AK */
   var AK1_exerciceN = getAmount(current,'Gr=AK-1','balance',currentStartDate,currentEndDate);
   var AK2_exerciceN = getAmount(current,'Gr=AK-2','balance',currentStartDate,currentEndDate);
   var AK_exerciceN = getAmount(current,'Gr=AK','balance',currentStartDate,currentEndDate);
   var AK_exerciceN1 = getAmount(current,'Gr=AK','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("AK","",1);
   tableRow.addCell("Bâtiments (1) dont Placement en  Net......./.......","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(AK1_exerciceN),"right",1);
   tableRow.addCell(formatValues(AK2_exerciceN),"right",1);
   tableRow.addCell(formatValues(AK_exerciceN),"right",1);
   tableRow.addCell(formatValues(AK_exerciceN1),"right",1);

   /* Row 9: AL */
   var AL1_exerciceN = getAmount(current,'Gr=AL-1','balance',currentStartDate,currentEndDate);
   var AL2_exerciceN = getAmount(current,'Gr=AL-2','balance',currentStartDate,currentEndDate);
   var AL_exerciceN = getAmount(current,'Gr=AL','balance',currentStartDate,currentEndDate);
   var AL_exerciceN1 = getAmount(current,'Gr=AL','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("AL","",1);
   tableRow.addCell("Aménagements, agencements et installations","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(AL1_exerciceN),"right",1);
   tableRow.addCell(formatValues(AL2_exerciceN),"right",1);
   tableRow.addCell(formatValues(AL_exerciceN),"right",1);
   tableRow.addCell(formatValues(AL_exerciceN1),"right",1);

   /* Row 10: AM */
   var AM1_exerciceN = getAmount(current,'Gr=AM-1','balance',currentStartDate,currentEndDate);
   var AM2_exerciceN = getAmount(current,'Gr=AM-2','balance',currentStartDate,currentEndDate);
   var AM_exerciceN = getAmount(current,'Gr=AM','balance',currentStartDate,currentEndDate);
   var AM_exerciceN1 = getAmount(current,'Gr=AM','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("AM","",1);
   tableRow.addCell("Matériel, mobilier et actifs biologiques","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(AM1_exerciceN),"right",1);
   tableRow.addCell(formatValues(AM2_exerciceN),"right",1);
   tableRow.addCell(formatValues(AM_exerciceN),"right",1);
   tableRow.addCell(formatValues(AM_exerciceN1),"right",1);

   /* Row 11: AN */
   var AN1_exerciceN = getAmount(current,'Gr=AN-1','balance',currentStartDate,currentEndDate);
   var AN2_exerciceN = getAmount(current,'Gr=AN-2','balance',currentStartDate,currentEndDate);
   var AN_exerciceN = getAmount(current,'Gr=AN','balance',currentStartDate,currentEndDate);
   var AN_exerciceN1 = getAmount(current,'Gr=AN','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("AN","",1);
   tableRow.addCell("Matériel de transport","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(AN1_exerciceN),"right",1);
   tableRow.addCell(formatValues(AN2_exerciceN),"right",1);
   tableRow.addCell(formatValues(AN_exerciceN),"right",1);
   tableRow.addCell(formatValues(AN_exerciceN1),"right",1);


   /* Row 12: AP */
   var AP1_exerciceN = getAmount(current,'Gr=AP-1','balance',currentStartDate,currentEndDate);
   var AP2_exerciceN = getAmount(current,'Gr=AP-2','balance',currentStartDate,currentEndDate);
   var AP_exerciceN = getAmount(current,'Gr=AP','balance',currentStartDate,currentEndDate);
   var AP_exerciceN1 = getAmount(current,'Gr=AP','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("AP","",1);
   tableRow.addCell("Avances et acomptes versés sur immobilisations","",1);
   tableRow.addCell("3","",1);
   tableRow.addCell(formatValues(AP1_exerciceN),"right",1);
   tableRow.addCell(formatValues(AP2_exerciceN),"right",1);
   tableRow.addCell(formatValues(AP_exerciceN),"right",1);
   tableRow.addCell(formatValues(AP_exerciceN1),"right",1);

   /* Row 13: AQ */
   tableRow = table.addRow();
   tableRow.addCell("AQ","",1);
   tableRow.addCell("IMMOBILISATIONS FINANCIERES","blackCell bold",1);
   tableRow.addCell("4","blackCell bold",1);
   tableRow.addCell("","blackCell bold",1);
   tableRow.addCell("","blackCell bold",1);
   tableRow.addCell("","blackCell bold",1);
   tableRow.addCell("","blackCell bold",1);
   
   /* Row 14: AR */
   var AR1_exerciceN = getAmount(current,'Gr=AR-1','balance',currentStartDate,currentEndDate);
   var AR2_exerciceN = getAmount(current,'Gr=AR-2','balance',currentStartDate,currentEndDate);
   var AR_exerciceN = getAmount(current,'Gr=AR','balance',currentStartDate,currentEndDate);
   var AR_exerciceN1 = getAmount(current,'Gr=AR','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("AR","",1);
   tableRow.addCell("Titres de participation","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(AR1_exerciceN),"right",1);
   tableRow.addCell(formatValues(AR2_exerciceN),"right",1);
   tableRow.addCell(formatValues(AR_exerciceN),"right",1);
   tableRow.addCell(formatValues(AR_exerciceN1),"right",1);

   /* Row 15: AS */
   var AS1_exerciceN = getAmount(current,'Gr=AS-1','balance',currentStartDate,currentEndDate);
   var AS2_exerciceN = getAmount(current,'Gr=AS-2','balance',currentStartDate,currentEndDate);
   var AS_exerciceN = getAmount(current,'Gr=AS','balance',currentStartDate,currentEndDate);
   var AS_exerciceN1 = getAmount(current,'Gr=AS','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("AS","",1);
   tableRow.addCell("Autres immobilisations financières","",1);
   tableRow.addCell("","",1);
   tableRow.addCell(formatValues(AS1_exerciceN),"right",1);
   tableRow.addCell(formatValues(AS2_exerciceN),"right",1);
   tableRow.addCell(formatValues(AS_exerciceN),"right",1);
   tableRow.addCell(formatValues(AS_exerciceN1),"right",1);

   /* Row 16: AZ */
   var AZ1_exerciceN = getAmount(current,'Gr=AE-1|AF-1|AG-1|AH-1|AJ-1|AK-1|AL-1|AM-1|AN-1|AR-1|AS-1','balance',currentStartDate,currentEndDate);
   var AZ2_exerciceN = getAmount(current,'Gr=AE-2|AF-2|AG-2|AH-2|AJ-2|AK-2|AL-2|AM-2|AN-2|AR-2|AS-2','balance',currentStartDate,currentEndDate);
   //var AZ1_exerciceN = calculate_AZ(AE1_exerciceN,AF1_exerciceN,AG1_exerciceN,AH1_exerciceN,AJ1_exerciceN,AK1_exerciceN,AL1_exerciceN,AM1_exerciceN,AN1_exerciceN,AP1_exerciceN,AR1_exerciceN,AS1_exerciceN);
   //var AZ2_exerciceN = calculate_AZ(AE2_exerciceN,AF2_exerciceN,AG2_exerciceN,AH2_exerciceN,AJ2_exerciceN,AK2_exerciceN,AL2_exerciceN,AM2_exerciceN,AN2_exerciceN,AP2_exerciceN,AR2_exerciceN,AS2_exerciceN);
   var AZ_exerciceN = getAmount(current,'Gr=AZ','balance',currentStartDate,currentEndDate);
   var AZ_exerciceN1 = getAmount(current,'Gr=AZ','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("AZ","",1);
   tableRow.addCell("TOTAL ACTIF IMMOBILISE","blackCell bold",1);
   tableRow.addCell("","blackCell bold",1);
   tableRow.addCell(formatValues(AZ1_exerciceN),"right blackCell bold",1);
   tableRow.addCell(formatValues(AZ2_exerciceN),"right blackCell bold",1);
   tableRow.addCell(formatValues(AZ_exerciceN),"right blackCell bold",1);
   tableRow.addCell(formatValues(AZ_exerciceN1),"right blackCell bold",1);

   /* Row 17: BA */
   var BA1_exerciceN = getAmount(current,'Gr=BA-1','balance',currentStartDate,currentEndDate);
   var BA2_exerciceN = getAmount(current,'Gr=BA-2','balance',currentStartDate,currentEndDate);
   var BA_exerciceN = getAmount(current,'Gr=BA','balance',currentStartDate,currentEndDate);
   var BA_exerciceN1 = getAmount(current,'Gr=BA','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("BA","",1);
   tableRow.addCell("ACTIF CIRCULANT HAO","",1);
   tableRow.addCell("5","",1);
   tableRow.addCell(formatValues(BA1_exerciceN),"right",1);
   tableRow.addCell(formatValues(BA2_exerciceN),"right",1);
   tableRow.addCell(formatValues(BA_exerciceN),"right",1);
   tableRow.addCell(formatValues(BA_exerciceN1),"right",1);

   /* Row 18: BB */
   var BB1_exerciceN = getAmount(current,'Gr=BB-1','balance',currentStartDate,currentEndDate);
   var BB2_exerciceN = getAmount(current,'Gr=BB-2','balance',currentStartDate,currentEndDate);
   var BB_exerciceN = getAmount(current,'Gr=BB','balance',currentStartDate,currentEndDate);
   var BB_exerciceN1 = getAmount(current,'Gr=BB','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("BB","",1);
   tableRow.addCell("STOCKS ET ENCOURS","",1);
   tableRow.addCell("6","",1);
   tableRow.addCell(formatValues(BB1_exerciceN),"right",1);
   tableRow.addCell(formatValues(BB2_exerciceN),"right",1);
   tableRow.addCell(formatValues(BB_exerciceN),"right",1);
   tableRow.addCell(formatValues(BB_exerciceN1),"right",1);

   /* Row 19: BG */
   tableRow = table.addRow();
   tableRow.addCell("BG","",1);
   tableRow.addCell("CREANCES ET EMPLOIS ASSIMILES ","",1);
   tableRow.addCell("","",1);
   tableRow.addCell("","",1);
   tableRow.addCell("","",1);
   tableRow.addCell("","",1);
   tableRow.addCell("","",1);

   /* Row 20: BH */
   var BH1_exerciceN = getAmount(current,'Gr=BH-1','balance',currentStartDate,currentEndDate);
   var BH2_exerciceN = getAmount(current,'Gr=BH-2','balance',currentStartDate,currentEndDate);
   var BH_exerciceN = getAmount(current,'Gr=BH','balance',currentStartDate,currentEndDate);
   var BH_exerciceN1 = getAmount(current,'Gr=BH','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("BH","",1);
   tableRow.addCell("Fournisseurs avances versées ","",1);
   tableRow.addCell("17","",1);
   tableRow.addCell(formatValues(BH1_exerciceN),"right",1);
   tableRow.addCell(formatValues(BH2_exerciceN),"right",1);
   tableRow.addCell(formatValues(BH_exerciceN),"right",1);
   tableRow.addCell(formatValues(BH_exerciceN1),"right",1);

   /* Row 21: BI */
   var BI1_exerciceN = getAmount(current,'Gr=BI-1','balance',currentStartDate,currentEndDate);
   var BI2_exerciceN = getAmount(current,'Gr=BI-2','balance',currentStartDate,currentEndDate);
   var BI_exerciceN = getAmount(current,'Gr=BI','balance',currentStartDate,currentEndDate);
   var BI_exerciceN1 = getAmount(current,'Gr=BI','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("BI","",1);
   tableRow.addCell("Clients ","",1);
   tableRow.addCell("7","",1);
   tableRow.addCell(formatValues(BI1_exerciceN),"right",1);
   tableRow.addCell(formatValues(BI2_exerciceN),"right",1);
   tableRow.addCell(formatValues(BI_exerciceN),"right",1);
   tableRow.addCell(formatValues(BI_exerciceN1),"right",1);

   /* Row 22: BJ */
   var BJ1_exerciceN = getAmount(current,'Gr=BJ-1','balance',currentStartDate,currentEndDate);
   var BJ2_exerciceN = getAmount(current,'Gr=BJ-2','balance',currentStartDate,currentEndDate);
   var BJ_exerciceN = getAmount(current,'Gr=BJ','balance',currentStartDate,currentEndDate);
   var BJ_exerciceN1 = getAmount(current,'Gr=BJ','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("BJ","",1);
   tableRow.addCell("Autres créances","",1);
   tableRow.addCell("8","",1);
   tableRow.addCell(formatValues(BJ1_exerciceN),"right",1);
   tableRow.addCell(formatValues(BJ2_exerciceN),"right",1);
   tableRow.addCell(formatValues(BJ_exerciceN),"right",1);
   tableRow.addCell(formatValues(BJ_exerciceN1),"right",1);

   /* Row 23: BK */
   var BK1_exerciceN = getAmount(current,'Gr=BA-1|BB-1|BG-1|BH-1|BI-1|BJ-1','balance',currentStartDate,currentEndDate);
   var BK2_exerciceN = getAmount(current,'Gr=BA-2|BB-2|BG-2|BH-2|BI-2|BJ-2','balance',currentStartDate,currentEndDate);
   var BK_exerciceN = getAmount(current,'Gr=BK','balance',currentStartDate,currentEndDate);
   var BK_exerciceN1 = getAmount(current,'Gr=BK','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("BK","",1);
   tableRow.addCell("TOTAL ACTIF CIRCULANT","blackCell bold",1);
   tableRow.addCell("","blackCell bold",1);
   tableRow.addCell(formatValues(BK1_exerciceN),"right blackCell bold",1);
   tableRow.addCell(formatValues(BK2_exerciceN),"right blackCell bold",1);
   tableRow.addCell(formatValues(BK_exerciceN),"right blackCell bold",1);
   tableRow.addCell(formatValues(BK_exerciceN1),"right blackCell bold",1);

   /* Row 24: BQ */
   var BQ1_exerciceN = getAmount(current,'Gr=BQ-1','balance',currentStartDate,currentEndDate);
   var BQ2_exerciceN = getAmount(current,'Gr=BQ-2','balance',currentStartDate,currentEndDate);
   var BQ_exerciceN = getAmount(current,'Gr=BQ','balance',currentStartDate,currentEndDate);
   var BQ_exerciceN1 = getAmount(current,'Gr=BQ','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("BQ","",1);
   tableRow.addCell("Titres de placement","",1);
   tableRow.addCell("9","",1);
   tableRow.addCell(formatValues(BQ1_exerciceN),"right",1);
   tableRow.addCell(formatValues(BQ2_exerciceN),"right",1);
   tableRow.addCell(formatValues(BQ_exerciceN),"right",1);
   tableRow.addCell(formatValues(BQ_exerciceN1),"right",1);

   /* Row 25: BR */
   var BR1_exerciceN = getAmount(current,'Gr=BR-1','balance',currentStartDate,currentEndDate);
   var BR2_exerciceN = getAmount(current,'Gr=BR-2','balance',currentStartDate,currentEndDate);
   var BR_exerciceN = getAmount(current,'Gr=BR','balance',currentStartDate,currentEndDate);
   var BR_exerciceN1 = getAmount(current,'Gr=BR','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("BR","",1);
   tableRow.addCell("Valeurs à encaisser","",1);
   tableRow.addCell("10","",1);
   tableRow.addCell(formatValues(BR1_exerciceN),"right",1);
   tableRow.addCell(formatValues(BR2_exerciceN),"right",1);
   tableRow.addCell(formatValues(BR_exerciceN),"right",1);
   tableRow.addCell(formatValues(BR_exerciceN1),"right",1);

   /* Row 26: BS */
   var BS1_exerciceN = getAmount(current,'Gr=BS-1','balance',currentStartDate,currentEndDate);
   var BS2_exerciceN = getAmount(current,'Gr=BS-2','balance',currentStartDate,currentEndDate);
   var BS_exerciceN = getAmount(current,'Gr=BS','balance',currentStartDate,currentEndDate);
   var BS_exerciceN1 = getAmount(current,'Gr=BS','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("BS","",1);
   tableRow.addCell("Banques, chèques postaux, caisse et assimilés","",1);
   tableRow.addCell("11","",1);
   tableRow.addCell(formatValues(BS1_exerciceN),"right",1);
   tableRow.addCell(formatValues(BS2_exerciceN),"right",1);
   tableRow.addCell(formatValues(BS_exerciceN),"right",1);
   tableRow.addCell(formatValues(BS_exerciceN1),"right",1);

   /* Row 27: BT */
   var BT1_exerciceN = getAmount(current,'Gr=BQ-1|BR-1|BS-1','balance',currentStartDate,currentEndDate);
   var BT2_exerciceN = getAmount(current,'Gr=BQ-2|BR-2|BS-2','balance',currentStartDate,currentEndDate);
   var BT_exerciceN = getAmount(current,'Gr=BT','balance',currentStartDate,currentEndDate);
   var BT_exerciceN1 = getAmount(current,'Gr=BT','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("BT","",1);
   tableRow.addCell("TOTAL TRESORERIE-ACTIF","blackCell bold",1);
   tableRow.addCell("","blackCell bold",1);
   tableRow.addCell(formatValues(BT1_exerciceN),"right blackCell bold",1);
   tableRow.addCell(formatValues(BT2_exerciceN),"right blackCell bold",1);
   tableRow.addCell(formatValues(BT_exerciceN),"right blackCell bold",1);
   tableRow.addCell(formatValues(BT_exerciceN1),"right blackCell bold",1);

   /* Row 28: BU */
   var BU1_exerciceN = getAmount(current,'Gr=BU-1','balance',currentStartDate,currentEndDate);
   var BU2_exerciceN = getAmount(current,'Gr=BU-2','balance',currentStartDate,currentEndDate);
   var BU_exerciceN = getAmount(current,'Gr=BU','balance',currentStartDate,currentEndDate);
   var BU_exerciceN1 = getAmount(current,'Gr=BU','opening',currentStartDate,currentEndDate);
   tableRow = table.addRow();
   tableRow.addCell("BU","",1);
   tableRow.addCell("Ecart de conversion-Actif","",1);
   tableRow.addCell("12","",1);
   tableRow.addCell(formatValues(BU1_exerciceN),"right",1);
   tableRow.addCell(formatValues(BU2_exerciceN),"right",1);
   tableRow.addCell(formatValues(BU_exerciceN),"right",1);
   tableRow.addCell(formatValues(BU_exerciceN1),"right",1);

   /* Row 29: BZ */
   var BZ1_exerciceN = calculate_BZ(AZ1_exerciceN,BK1_exerciceN,BT1_exerciceN,BU1_exerciceN);
   var BZ2_exerciceN = calculate_BZ(AZ2_exerciceN,BK2_exerciceN,BT2_exerciceN,BU2_exerciceN);
   var BZ_exerciceN = calculate_BZ(AZ_exerciceN,BK_exerciceN,BT_exerciceN,BU_exerciceN);
   var BZ_exerciceN1 = calculate_BZ(AZ_exerciceN1,BK_exerciceN1,BT_exerciceN1,BU_exerciceN1);
   tableRow = table.addRow();
   tableRow.addCell("BZ","",1);
   tableRow.addCell("TOTAL GENERAL","blackCell bold",1);
   tableRow.addCell("","blackCell bold",1);
   tableRow.addCell(formatValues(BZ1_exerciceN),"right blackCell bold",1);
   tableRow.addCell(formatValues(BZ2_exerciceN),"right blackCell bold",1);
   tableRow.addCell(formatValues(BZ_exerciceN),"right blackCell bold",1);
   tableRow.addCell(formatValues(BZ_exerciceN1),"right blackCell bold",1);

   return report;
}


/**************************************************************************************
*
* Functions that calculate the data for the report
*
**************************************************************************************/
// function calculate_AZ(AE,AF,AG,AH,AJ,AK,AL,AM,AN,AP,AR,AS) {
//    var res = "";
//    res = Banana.SDecimal.add(res,AE);
//    res = Banana.SDecimal.add(res,AF);
//    res = Banana.SDecimal.add(res,AG);
//    res = Banana.SDecimal.add(res,AH);
//    res = Banana.SDecimal.add(res,AJ);
//    res = Banana.SDecimal.add(res,AK);
//    res = Banana.SDecimal.add(res,AL);
//    res = Banana.SDecimal.add(res,AM);
//    res = Banana.SDecimal.add(res,AN);
//    res = Banana.SDecimal.add(res,AP);
//    res = Banana.SDecimal.add(res,AR);
//    res = Banana.SDecimal.add(res,AS);
//    return res;
// }

function calculate_BZ(AZ,BK,BT,BU) {
   var res = "";
   res = Banana.SDecimal.add(res,AZ);
   res = Banana.SDecimal.add(res,BK);
   res = Banana.SDecimal.add(res,BT);
   res = Banana.SDecimal.add(res,BU);
   return res;
}



/**************************************************************************************
*
* Functions that retrieve and format values from Banana
*
**************************************************************************************/

function getAmount(banDoc,account,property,startDate,endDate) {
   var currentBal = banDoc.currentBalance(account,startDate,endDate)
   var value = currentBal[property];
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
   stylesheet.addStyle(".col2", "width:30%");
   stylesheet.addStyle(".col3", "width:5%");
   stylesheet.addStyle(".col4", "width:15%");
   stylesheet.addStyle(".col5", "width:15%");
   stylesheet.addStyle(".col6", "width:15%");
   stylesheet.addStyle(".col7", "width:15%");
   stylesheet.addStyle("table.tableCashFlow td", "border:thin solid black;padding-bottom:2px;padding-top:5px");

   return stylesheet;
}
