# Cash Flow Report

The **Cash Flow Report** is part of the BananaApp [Accounting Reports (OHADA - RDC)](https://www.banana.ch/apps/fr/node/9093) and it's been developed following the specific [OHADA-RDC Cash Flow Documentation](https://github.com/BananaAccounting/Africa/blob/master/RDC/cashflow/cashflow_documentation.pdf)

The syntax used to specify which data to use is **{account/group, column}**, where:
* **account/group**: indicates the account or group of the Accounts table in Banana (groups begins with **Gr=**);
* **column**: indicates the type of data (Opening, Debit, Credit, Total(debit-credit)) of the Accounts table in Banana;
* **(-1)**: indicates that the value must be inverted. If positive inverts to a negative value, if negative inverts to a positive value.

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

This is optional: if the previous year file is selected it is used to calculate and then insert on the report the data in the EXERCICE N-1 column. If no file is selected, the EXERCICE N-1 column will be empty.

## How it works

### Install the BananaApp:
* Start Banana Accounting.
* Install the BananaApp **Accounting Reports (OHADA - RDC)** for the Balance Sheet, Profit/Loss Statement and Cash Flow package reports. Visit the [Menu Apps](https://www.banana.ch/doc9/en/node/4727) documentation.

### Run the BananaApp:
* Open your accounting file with Banana (or download the [accounting_2018.ac2](https://github.com/BananaAccounting/Africa/raw/master/RDC/cashflow/accounting_2018.ac2) file example).
* In Banana select from the **menu Apps** the BananaApp **Accounting Reports (OHADA - RDC)** then **Balance Sheet, Profit/Loss Statement, Cash Flow**.
* Check the results.

Report example:
![Cash Flow Report Example](https://raw.githubusercontent.com/BananaAccounting/Africa/master/RDC/cashflow/images/banana_report.png)
