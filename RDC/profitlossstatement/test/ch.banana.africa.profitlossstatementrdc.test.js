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
// @id = ch.banana.africa.profitlossstatementrdc.test
// @api = 1.0
// @pubdate = 2018-12-18
// @publisher = Banana.ch SA
// @description = [Test] Profit & Loss Statement Report (OHADA - RDC) [BETA]
// @task = app.command
// @doctype = *.*
// @docproperties =
// @outputformat = none
// @inputdataform = none
// @timeout = -1
// @includejs = ../ch.banana.africa.profitlossstatementrdc.js

// Register this test case to be executed
Test.registerTestCase(new TestProfitLossStatementRDC());

// Define the test class, the name of the class is not important
function TestProfitLossStatementRDC() {
}

// This method will be called at the beginning of the test case
TestProfitLossStatementRDC.prototype.initTestCase = function() {
   this.progressBar = Banana.application.progressBar;
}

// This method will be called at the end of the test case
TestProfitLossStatementRDC.prototype.cleanupTestCase = function() {
}

// This method will be called before every test method is executed
TestProfitLossStatementRDC.prototype.init = function() {
}

// This method will be called after every test method is executed
TestProfitLossStatementRDC.prototype.cleanup = function() {
}

// Every method with the prefix 'test' are executed automatically as test method
// You can defiend as many test methods as you need

TestProfitLossStatementRDC.prototype.testVerifyMethods = function() {
   Test.logger.addText("The object Test defines methods to verify conditions.");

   var banDoc = Banana.application.openDocument("file:script/../test/testcases/accounting_2018.ac2");
   var startDate = banDoc.info("AccountingDataBase","OpeningDate");
   var endDate = banDoc.info("AccountingDataBase","ClosureDate");

   Test.assertIsEqual(-1*getAmount(banDoc,'Gr=TA','balance',startDate,endDate), 190000000.00);
   Test.assertIsEqual(-1*getAmount(banDoc,'Gr=TA','opening',startDate,endDate), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RA','balance',startDate,endDate), 182160000.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RA','opening',startDate,endDate), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RB','balance',startDate,endDate), -2260000.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RB','opening',startDate,endDate), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=132','balance',startDate,endDate)), 10100000.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=132','opening',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TB','balance',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TB','opening',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TC','balance',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TC','opening',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TD','balance',startDate,endDate)), 1200000.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TD','opening',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TA|TB|TC|TD','balance',startDate,endDate)), 191200000.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TA|TB|TC|TD','opening',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TE','balance',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TE','opening',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TF','balance',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TF','opening',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TG','balance',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TG','opening',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TH','balance',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TH','opening',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TI','balance',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TI','opening',startDate,endDate)), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RC','balance',startDate,endDate), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RC','opening',startDate,endDate), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RD','balance',startDate,endDate), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RD','opening',startDate,endDate), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RE','balance',startDate,endDate), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RE','opening',startDate,endDate), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RF','balance',startDate,endDate), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RF','opening',startDate,endDate), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RG','balance',startDate,endDate), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RG','opening',startDate,endDate), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RH','balance',startDate,endDate), 2600000.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RH','opening',startDate,endDate), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RI','balance',startDate,endDate), 30000.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RI','opening',startDate,endDate), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RJ','balance',startDate,endDate), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RJ','opening',startDate,endDate), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=133','balance',startDate,endDate)), 8670000.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=133','opening',startDate,endDate)), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RK','balance',startDate,endDate), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RK','opening',startDate,endDate), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=134','balance',startDate,endDate)), 8670000.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=134','opening',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TJ','balance',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TJ','opening',startDate,endDate)), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RL','balance',startDate,endDate), 1766666.67);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RL','opening',startDate,endDate), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=135','balance',startDate,endDate)), 6903333.33);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=135','opening',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TK','balance',startDate,endDate)), 140000.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TK','opening',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TL','balance',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TL','opening',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TM','balance',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TM','opening',startDate,endDate)), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RM','balance',startDate,endDate), 3100000.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RM','opening',startDate,endDate), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RN','balance',startDate,endDate), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RN','opening',startDate,endDate), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=136','balance',startDate,endDate)), -2960000.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=136','opening',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=137','balance',startDate,endDate)), 3943333.33);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=137','opening',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TN','balance',startDate,endDate)), 6000000.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TN','opening',startDate,endDate)), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TO','balance',startDate,endDate)), 300000.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=TO','opening',startDate,endDate)), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RO','balance',startDate,endDate), 3333333.33);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RO','opening',startDate,endDate), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RP','balance',startDate,endDate), 250000.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RP','opening',startDate,endDate), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=138','balance',startDate,endDate)), 2716666.67);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=138','opening',startDate,endDate)), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RQ','balance',startDate,endDate), 666000.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RQ','opening',startDate,endDate), 0.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RS','balance',startDate,endDate), 2331000.00);
   Test.assertIsEqual(1*getAmount(banDoc,'Gr=RS','opening',startDate,endDate), 0.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=131','balance',startDate,endDate)), 3663000.00);
   Test.assertIsEqual(-1*(getAmount(banDoc,'Gr=131','opening',startDate,endDate)), 0.00);

}

TestProfitLossStatementRDC.prototype.testBananaApps = function() {
   Test.logger.addText("This test will tests the BananaApp profitlossstatement_rdc.js");
   
   var currentDocument = Banana.application.openDocument("file:script/../test/testcases/accounting_2018.ac2");
   Test.assert(currentDocument, "current year file ac2 not found");

   // Add the report content text to the result txt file
   var report = createProfitLossStatementReport(currentDocument);
   Test.logger.addReport("Report Profit & Loss Statement RDC", report);

}
