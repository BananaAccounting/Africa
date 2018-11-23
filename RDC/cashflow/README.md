# Cash Flow for RDC

The BananaApp has been developed following the specific RDC pdf documentations below.

Content:

* **cashflow_rdc.js**: the BananaApp;
* **accounting_2018.ac2**: example Banana file for the current year;
* **accounting_2017.ac2**: example Banana file for the previous year;
* **Tableau des flux de tresorerie.pdf**: an example of how the report should looks like;
* **Formules comptales du tableau de flux de trésorerie.pdf**:
	* a document that specifies which data of Banana Accounting to use and how to calculate the various elements of the report.
	* The syntax used in the documentation is **xx = {ligne (317);colonne (7)}**, where **ligne(xx)** indicates the row and **colonne(xx)** indicates the column (1=Section, 2=Group, 3=Account, 4=Description, 5=BClass, 6=Gr, 7=Opening, 8=Debit, 9=Credit, 10=Balance, 11=total(debit-credit)) of the Accounts table in Banana.


## How it works
* Start Banana Accounting
* Open the current year accounting file (i.e. accounting_2018.ac2)
* Download and Install the cashflow BananaApp
* Run the "Tableau des flux de trésorerie (OHADA - RDC) [BETA]" BananaApp from the menu Apps
* Select the previous year accounting file (i.e. accounting_2017.ac2) in the dialog window
* Check the results
