# Accounting reports for OHADA-RDC

The BananaApp [Accounting Reports (OHADA - RDC)](https://www.banana.ch/apps/fr/node/9093) creates a report with the following three documents:
* Balance Sheet
* Profit/Loss Statement
* Cash Flow

The app has been developed following the specific OHADA-RDC documentations:
* [Balance Sheet documentation](https://github.com/BananaAccounting/Africa/blob/master/RDC/statements/balancesheet/balancesheet_documentation.pdf)
* [Profit/Loss Statement documentation](https://github.com/BananaAccounting/Africa/blob/master/RDC/statements/profitlossstatement/profitlosstatement_documentation.pdf)
* [Cash Flow documentation](https://github.com/BananaAccounting/Africa/blob/master/RDC/statements/cashflow/cashflow_documentation.pdf)

In the documentations, the syntax used to specify which data to use is **{account/group,column}**, where:
* **account/group**: indicates the account or group of the Accounts table in Banana (groups begins with **Gr=**);
* **column**: indicates the type of data (Opening, Debit, Credit, Total(debit-credit)) of the Accounts table in Banana;
* **(-1)**: indicates that the value must be inverted. If positive inverts to a negative value, if negative inverts to a positive value.

JavaScript files:
* [Balance Sheet JavaScript file](https://raw.githubusercontent.com/BananaAccounting/Africa/master/RDC/statements/balancesheet/ch.banana.africa.balancesheetrdc.js)
* [Profit/Loss Statement JavaScript file](https://raw.githubusercontent.com/BananaAccounting/Africa/master/RDC/statements/profitlossstatement/ch.banana.africa.profitlossstatementrdc.js)
* [Cash Flow JavaScript file](https://raw.githubusercontent.com/BananaAccounting/Africa/master/RDC/statements/cashflow/ch.banana.africa.cashflowrdc.js)


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
* Open your accounting file with Banana.
* In Banana select from the **menu Apps** the BananaApp **Accounting Reports (OHADA - RDC)** then **Balance Sheet, Profit/Loss Statement, Cash Flow**.
* Check the results.

Active Balance Sheet Report example:
![Active Balance Sheet Report Example](https://raw.githubusercontent.com/BananaAccounting/Africa/master/RDC/statements/balancesheet/images/balancesheet_active_report.png)

Passive Balance Sheet Report example:
![Passive Balance Sheet Report Example](https://raw.githubusercontent.com/BananaAccounting/Africa/master/RDC/statements/balancesheet/images/balancesheet_passive_report.png)

Profit/Loss Statement Report example:
![Profit/Loss Statement Report Example](https://raw.githubusercontent.com/BananaAccounting/Africa/master/RDC/statements/profitlossstatement/images/profitlossstatement_report.png)

Cash Flow Report example:
![Cash Flow Report Example](https://raw.githubusercontent.com/BananaAccounting/Africa/master/RDC/statements/cashflow/images/banana_report.png)
