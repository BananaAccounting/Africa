# Accounting reports for OHADA-RDC

The BananaApp creates a report with the following three documents:
* Balance Sheet
* Profit/Loss Statement
* Cash Flow

The app has been developed following the specific OHADA-RDC documentations:
* [Balance Sheet documentation](https://github.com/BananaAccounting/Africa/blob/master/RDC/balancesheet/balancesheet_documentation.pdf)
* [Profit/Loss Statement documentation](https://github.com/BananaAccounting/Africa/blob/master/RDC/profitlossstatement/profitlosstatement_documentation.pdf)
* [Cash Flow documentation](https://github.com/BananaAccounting/Africa/blob/master/RDC/cashflow/cashflow_documentation.pdf)

BananaApps:
* [All-in-one package report app](https://github.com/BananaAccounting/Africa/raw/master/RDC/ch.banana.africa.reportsohadardc.sbaa)
* [Balance Sheet report app](https://raw.githubusercontent.com/BananaAccounting/Africa/master/RDC/balancesheet/ch.banana.africa.balancesheetrdc.js)
* [Profit/Loss Statement app](https://raw.githubusercontent.com/BananaAccounting/Africa/master/RDC/profitlossstatement/ch.banana.africa.profitlossstatementrdc.js)
* [Cash Flow report app](https://raw.githubusercontent.com/BananaAccounting/Africa/master/RDC/cashflow/ch.banana.africa.cashflowrdc.js)


## Banana Accounting file settings
In Banana select from the **menu File** the command **File and accounting propeties...**.
### Address
* Select the **Address** tab.
* Insert the **company name** in the Company field.
* Insert the **Designation of the entity number** in the Fiscal number field.
* Insert the **Identification number** in the Vat/Sales tex number.

The data inserted will be used to fill the header information of the report.

### Options
* Select the **Options** tab.
* Insert the **file from previous year**. 

The file from previous year is used only for the Cash Flow report.
It is optional: if the previous year file is selected it is used to calculate and then insert on the report the data in the EXERCICE N-1 column. If no file is selected, the EXERCICE N-1 column will be empty.


## How it works

### Install the BananaApp:
* Start Banana Accounting.
* Install the BananaApp **Accounting Reports (OHADA - RDC)**. Visit the [Menu Apps](https://www.banana.ch/doc9/en/node/4727) documentation.

### Run the BananaApp:
* Open your accounting file with Banana (or download the [accounting_2018.ac2](https://github.com/BananaAccounting/Africa/raw/master/RDC/cashflow/accounting_2018.ac2) file example).
* In Banana select from the **menu Apps** the BananaApp **Accounting Reports (OHADA - RDC)** then **Balance Sheet, Profit/Loss Statement, Cash Flow**.
* Check the results.
