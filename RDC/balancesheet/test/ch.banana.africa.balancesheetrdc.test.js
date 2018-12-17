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
// @id = ch.banana.africa.balancesheetrdc.test
// @api = 1.0
// @pubdate = 2018-12-17
// @publisher = Banana.ch SA
// @description = [Test] Balance sheet  Report (OHADA - RDC) [BETA]
// @task = app.command
// @doctype = *.*
// @docproperties =
// @outputformat = none
// @inputdataform = none
// @timeout = -1
// @includejs = ../ch.banana.africa.balancesheetrdc.js

// Register this test case to be executed
Test.registerTestCase(new TestBalanceSheetRDC());

// Define the test class, the name of the class is not important
function TestBalanceSheetRDC() {
}

// This method will be called at the beginning of the test case
TestBalanceSheetRDC.prototype.initTestCase = function() {
   this.progressBar = Banana.application.progressBar;
}

// This method will be called at the end of the test case
TestBalanceSheetRDC.prototype.cleanupTestCase = function() {
}

// This method will be called before every test method is executed
TestBalanceSheetRDC.prototype.init = function() {
}

// This method will be called after every test method is executed
TestBalanceSheetRDC.prototype.cleanup = function() {
}

// Every method with the prefix 'test' are executed automatically as test method
// You can defiend as many test methods as you need

TestBalanceSheetRDC.prototype.testVerifyMethods = function() {
   Test.logger.addText("The object Test defines methods to verify conditions.");

   var banDoc = Banana.application.openDocument("file:script/../test/testcases/accounting_2018.ac2");
   var startDate = banDoc.info("AccountingDataBase","OpeningDate");
   var endDate = banDoc.info("AccountingDataBase","ClosureDate");


   /*
      Active Balance Sheet tests
   */
   Test.assertIsEqual(getAmount(banDoc,'Gr=AE-1','balance',startDate,endDate), "8.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AE-2','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AE','balance',startDate,endDate), "8.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AE','opening',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AF-1','balance',startDate,endDate), "-8.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AF-2','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AF','balance',startDate,endDate), "-8.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AF','opening',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AG-1','balance',startDate,endDate), "-7.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AG-2','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AG','balance',startDate,endDate), "-7.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AG','opening',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AH-1','balance',startDate,endDate), "-6.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AH-2','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AH','balance',startDate,endDate), "-6.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AH','opening',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AJ-1','balance',startDate,endDate), "-1.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AJ-2','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AJ','balance',startDate,endDate), "-1.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AJ','opening',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AK-1','balance',startDate,endDate), "-2.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AK-2','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AK','balance',startDate,endDate), "-2.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AK','opening',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AL-1','balance',startDate,endDate), "-3.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AL-2','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AL','balance',startDate,endDate), "-3.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AL','opening',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AM-1','balance',startDate,endDate), "-4.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AM-2','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AM','balance',startDate,endDate), "-4.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AM','opening',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AN-1','balance',startDate,endDate), "-5.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AN-2','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AN','balance',startDate,endDate), "-5.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AN','opening',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AP-1','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AP-2','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AP','balance',startDate,endDate), "-11.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AP','opening',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AR-1','balance',startDate,endDate), "-8.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AR-2','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AR','balance',startDate,endDate), "-8.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AR','opening',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AS-1','balance',startDate,endDate), "-7.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AS-2','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AS','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AS','opening',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AE-1|AF-1|AG-1|AH-1|AJ-1|AK-1|AL-1|AM-1|AN-1|AR-1|AS-1','balance',startDate,endDate), "-43.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AE-2|AF-2|AG-2|AH-2|AJ-2|AK-2|AL-2|AM-2|AN-2|AR-2|AS-2','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AZ','balance',startDate,endDate), "-54.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=AZ','opening',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BA-1','balance',startDate,endDate), "20.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BA-2','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BA','balance',startDate,endDate), "20.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BA','opening',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BB-1','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BB-2','balance',startDate,endDate), "8.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BB','balance',startDate,endDate), "8.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BB','opening',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BH-1','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BH-2','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BH','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BH','opening',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BI-1','balance',startDate,endDate), "-62.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BI-2','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BI','balance',startDate,endDate), "-62.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BI','opening',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BJ-1','balance',startDate,endDate), "-44.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BJ-2','balance',startDate,endDate), "18.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BJ','balance',startDate,endDate), "-26.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BJ','opening',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BA-1|BB-1|BG-1|BH-1|BI-1|BJ-1','balance',startDate,endDate), "-86.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BA-2|BB-2|BG-2|BH-2|BI-2|BJ-2','balance',startDate,endDate), "26.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BK','balance',startDate,endDate), "-60.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BK','opening',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BQ-1','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BQ-2','balance',startDate,endDate), "100.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BQ','balance',startDate,endDate), "100.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BQ','opening',startDate,endDate), "100.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BR-1','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BR-2','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BR','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BR','opening',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BS-1','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BS-2','balance',startDate,endDate), "-40.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BS','balance',startDate,endDate), "-40.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BS','opening',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BQ-1|BR-1|BS-1','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BQ-2|BR-2|BS-2','balance',startDate,endDate), "60.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BT','balance',startDate,endDate), "60.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BT','opening',startDate,endDate), "100.00");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BU-1','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BU-2','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BU','balance',startDate,endDate), "");
   Test.assertIsEqual(getAmount(banDoc,'Gr=BU','opening',startDate,endDate), "");

   var AZ1_exerciceN = getAmount(banDoc,'Gr=AE-1|AF-1|AG-1|AH-1|AJ-1|AK-1|AL-1|AM-1|AN-1|AR-1|AS-1','balance',startDate,endDate);
   var BK1_exerciceN = getAmount(banDoc,'Gr=BA-1|BB-1|BG-1|BH-1|BI-1|BJ-1','balance',startDate,endDate);
   var BT1_exerciceN = getAmount(banDoc,'Gr=BQ-1|BR-1|BS-1','balance',startDate,endDate);
   var BU1_exerciceN = getAmount(banDoc,'Gr=BU-1','balance',startDate,endDate);
   Test.assertIsEqual(calculate_BZ(AZ1_exerciceN,BK1_exerciceN,BT1_exerciceN,BU1_exerciceN), "-129.00");

   var AZ2_exerciceN = getAmount(banDoc,'Gr=AE-2|AF-2|AG-2|AH-2|AJ-2|AK-2|AL-2|AM-2|AN-2|AR-2|AS-2','balance',startDate,endDate);
   var BK2_exerciceN = getAmount(banDoc,'Gr=BA-2|BB-2|BG-2|BH-2|BI-2|BJ-2','balance',startDate,endDate);
   var BT2_exerciceN = getAmount(banDoc,'Gr=BQ-2|BR-2|BS-2','balance',startDate,endDate);
   var BU2_exerciceN = getAmount(banDoc,'Gr=BU-2','balance',startDate,endDate);
   Test.assertIsEqual(calculate_BZ(AZ2_exerciceN,BK2_exerciceN,BT2_exerciceN,BU2_exerciceN), "86.00");

   var AZ_exerciceN = getAmount(banDoc,'Gr=AZ','balance',startDate,endDate);
   var BK_exerciceN = getAmount(banDoc,'Gr=BK','balance',startDate,endDate);
   var BT_exerciceN = getAmount(banDoc,'Gr=BT','balance',startDate,endDate);
   var BU_exerciceN = getAmount(banDoc,'Gr=BU','balance',startDate,endDate);
   Test.assertIsEqual(calculate_BZ(AZ_exerciceN,BK_exerciceN,BT_exerciceN,BU_exerciceN), "-54.00");

   var AZ_exerciceN1 = getAmount(banDoc,'Gr=AZ','opening',startDate,endDate);
   var BK_exerciceN1 = getAmount(banDoc,'Gr=BK','opening',startDate,endDate);
   var BT_exerciceN1 = getAmount(banDoc,'Gr=BT','opening',startDate,endDate);
   var BU_exerciceN1 = getAmount(banDoc,'Gr=BU','opening',startDate,endDate);
   Test.assertIsEqual(calculate_BZ(AZ_exerciceN1,BK_exerciceN1,BT_exerciceN1,BU_exerciceN1), "100.00");


   /*
      Passive Balance Sheet tests
   */
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=CA','balance',startDate,endDate), -93.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=CA','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=CB','balance',startDate,endDate), -9.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=CB','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=CD','balance',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=CD','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=CE','balance',startDate,endDate), -8.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=CE','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=CF','balance',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=CF','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=CG','balance',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=CG','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=CH','balance',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=CH','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=CJ','balance',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=CJ','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=CL','balance',startDate,endDate), -8.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=CL','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((1)*getAmount(banDoc,'Gr=CM','balance',startDate,endDate), 0.00);
   Test.assertIsEqual((1)*getAmount(banDoc,'Gr=CM','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=CP','balance',startDate,endDate), -189.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=CP','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DA','balance',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DA','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DB','balance',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DB','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DC','balance',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DC','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DD','balance',startDate,endDate), 36.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DD','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DF','balance',startDate,endDate), -153.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DF','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DH','balance',startDate,endDate), 21.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DH','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DI','balance',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DI','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DJ','balance',startDate,endDate), -11.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DJ','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DK','balance',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DK','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DM','balance',startDate,endDate), -1.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DM','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DN','balance',startDate,endDate), -10.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DN','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DP','balance',startDate,endDate), -1.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DP','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DQ','balance',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DQ','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DR','balance',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DR','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DT','balance',startDate,endDate), -20.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DT','opening',startDate,endDate), -40.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DV','balance',startDate,endDate), -10.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DV','opening',startDate,endDate), 0.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DZ','balance',startDate,endDate), -184.00);
   Test.assertIsEqual((-1)*getAmount(banDoc,'Gr=DZ','opening',startDate,endDate), -40.00);

}

TestBalanceSheetRDC.prototype.testBananaApps = function() {
   Test.logger.addText("This test will tests the BananaApp balancesheet_rdc.js");
   
   var currentDocument = Banana.application.openDocument("file:script/../test/testcases/accounting_2018.ac2");
   Test.assert(currentDocument, "banDoc year file ac2 not found");

   // Add the report content text to the result txt file
   var report = createReport(currentDocument);
   Test.logger.addReport("Report Balance Sheet RDC", report);

}
