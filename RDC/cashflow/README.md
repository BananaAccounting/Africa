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


## How it works
* Start Banana Accounting
* Download the **accounting_2018.ac2** and **accounting_2017.ac2** files
* Open the current year accounting file (i.e. accounting_2018.ac2)
* Install the BananaApp **Cash Flow Report (OHADA - RDC)** (visit the [Menu Apps](https://www.banana.ch/doc9/en/node/7709) documentation)
* Run the BananaApp from the menu Apps
* If the option to use the previous year accounting file is accepted, select the accounting file (i.e. accounting_2017.ac2)
* Check the results
