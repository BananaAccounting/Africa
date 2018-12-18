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
// @id = ch.banana.africa.reportsohadardc
// @api = 1.0
// @pubdate = 2018-12-18
// @publisher = Banana.ch SA
// @description = Balance Sheet, Profit/Loss Statement, Cash Flow
// @description.fr = Bilan, Compte de résultat, Tableau des flux de tresorerie
// @task = app.command
// @doctype = *.*
// @docproperties =
// @outputformat = none
// @inputdataform = none
// @timeout = -1
// @includejs = balancesheet.inc
// @includejs = profitlossstatement.inc
// @includejs = cashflow.inc


//balancesheet/ch.banana.africa.balancesheetrdc.js
//profitlossstatement/ch.banana.africa.profitlossstatementrdc.js
//cashflow/ch.banana.africa.cashflowrdc.js

function exec() {

	/* CURRENT year file: the current opened document in Banana */
	var current = Banana.document;
	if (!current) {
		return "@Cancel";
	}

	/* PREVIOUS year file: Return the previous year document.
	   If the previous year is not defined or it is not found it returns null */
	var previous = Banana.document.previousYear();

	var report = Banana.Report.newReport("Bilan, Compte de résultat, Tableau des flux de tresorerie (OHADA - RDC) [BETA]");
	
	/* 1. Balance Sheet report */
	createBalanceSheetReport(current,report);
	report.addPageBreak();
	
	/* 2. Profit/Loss Statement report */
	createProfitLossStatementReport(current,report);
	report.addPageBreak();

	/* 3. Cash Flow report */
	createCashFlowReport(current,previous,report);

	var stylesheet = createStyleSheet();
	Banana.Report.preview(report, stylesheet);

}

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

   style = stylesheet.addStyle(".blueCell");
   style.setAttribute("background-color", "#b7c3e0");

   /* table */
   var tableStyle = stylesheet.addStyle(".tableActiveBalanceSheet");
   tableStyle.setAttribute("width", "100%");
   stylesheet.addStyle(".col1", "width:4%");
   stylesheet.addStyle(".col2", "width:31%");
   stylesheet.addStyle(".col3", "width:5%");
   stylesheet.addStyle(".col4", "width:15%");
   stylesheet.addStyle(".col5", "width:15%");
   stylesheet.addStyle(".col6", "width:15%");
   stylesheet.addStyle(".col7", "width:15%");
   stylesheet.addStyle("table.tableActiveBalanceSheet td", "padding-bottom:2px;padding-top:5px");

   var tableStyle = stylesheet.addStyle(".tablePassiveBalanceSheet");
   tableStyle.setAttribute("width", "100%");
   stylesheet.addStyle(".pCol1", "width:5%");
   stylesheet.addStyle(".pCol2", "width:60%");
   stylesheet.addStyle(".pCol3", "width:5%");
   stylesheet.addStyle(".pCol4", "width:15%");
   stylesheet.addStyle(".pCol5", "width:15%");
   stylesheet.addStyle("table.tablePassiveBalanceSheet td", "border:thin solid black;padding-bottom:2px;padding-top:5px");

   var tableStyle = stylesheet.addStyle(".tableProfitLossStatement");
   tableStyle.setAttribute("width", "100%");
   stylesheet.addStyle(".col1", "width:5%");
   stylesheet.addStyle(".col2", "width:53%");
   stylesheet.addStyle(".col3", "width:5%");
   stylesheet.addStyle(".col4", "width:7%");
   stylesheet.addStyle(".col5", "width:15%");
   stylesheet.addStyle(".col6", "width:15%");
   stylesheet.addStyle("table.tableProfitLossStatement td", "border:thin solid black;padding-bottom:1px;padding-top:3px");

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



