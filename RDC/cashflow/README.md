# Cash Flow for RDC

The BananaApp has been developed following the specific RDC pdf documentations below.

Content:

* **ch.banana.africa.cashflowrdc.js**: the BananaApp;
* **accounting_2018.ac2**: example Banana file for the current year;
* **accounting_2017.ac2**: example Banana file for the previous year;
* **Tableau des flux de tresorerie.pdf**: an example of how the report should looks like;
* **Formules comptales du tableau de flux de trésorerie.pdf**:
	* a document that specifies which data of Banana Accounting to use and how to calculate the various elements of the report.
	* The syntax is **{account/group, column}**, where **account/group** indicates the account or the group of the Accounts table in Banana (groups begins with **Gr=**); the **column** indicates the type of data (Opening, Debit, Credit, Total(debit-credit)) of the Accounts table in Banana.
	* The **(-1)** indicates that the value must be inverted. If positive inverts to a negative value, if negative inverts to a positive value.

## Banana Accounting file settings
* In Banana select from the **menu File** the command **File and accounting propeties...**
* Insert the **company name** in the Company field
* Insert the **Designation of the entity number** in the Fiscal number field
* Insert the **Identification number** in the Vat/Sales tex number

The data inserted will be used to fill the header information of the report.

## How it works

### Install the BananaApp:
* Start Banana Accounting
* Install the BananaApp **Cash Flow Report (OHADA - RDC)** (visit the [Menu Apps](https://www.banana.ch/doc9/en/node/7709) documentation)

### Run the BananaApp:
* Open your accounting file with Banana (or download the [accounting_2018.ac2] (https://github.com/BananaAccounting/Africa/raw/master/RDC/cashflow/accounting_2018.ac2) and [accounting_2017.ac2] (https://github.com/BananaAccounting/Africa/raw/master/RDC/cashflow/accounting_2017.ac2) files examples)
* In Banana select from the **menu Apps** the BananaApp **Cash Flow Report (OHADA - RDC)** 
* Choose if include or not the previous year accounting file to the report. In case you want to include it, select the accounting file and click on Ok.
* The report is generated
* Check the results
