# Cash Flow Report

The **Cash Flow Report** is part of the BananaApp [Accounting Reports (OHADA - RDC)](https://www.banana.ch/apps/fr/node/9093).

It's been developed following the specific [OHADA-RDC Cash Flow Documentation](https://github.com/BananaAccounting/Africa/blob/master/RDC/cashflow/cashflow_documentation.pdf).

In the documentation, the syntax used to specify which data to use to build the report is **account/group,column**, where:
* **account/group**: indicates the account or group of the Accounts table in Banana (groups begins with **Gr=**);
* **column**: indicates the type of data (Opening, Debit, Credit, Total(debit-credit)) of the Accounts table in Banana;
* **(-1)**: indicates that the value must be inverted. If positive inverts to a negative value, if negative inverts to a positive value.

Cash Flow Report example:
![Cash Flow Report Example](https://raw.githubusercontent.com/BananaAccounting/Africa/master/RDC/cashflow/images/banana_report.png)
