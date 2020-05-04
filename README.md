# Hosted [Hotel Management System](https://sweetlifehotel.herokuapp.com/)
#### Design and development of hotel information management system

Proposition content and requirements:
The design and development of the hotel information management system is divided into five modules. Module one is user management. This module needs to complete the login and registration of users, and implement the functions of account and password management such as ordinary users, landlord users, hotel users, administrator users, and other functions. Module two is platform operation management. This module needs to manage coupons, advertisements, fees and other information. Module three is the report and query statistics. This module needs to complete the report viewing function and query statistics function. Module four is the basic data management, this module is to complete the management of background data. Module five is the management of listing information. This module is used by hotels or hostels to manage listing information. You can add, modify, delete information, upload pictures of listings, and list / unlist listings.

Requirements:
Hardware equipment: a computer

Software device: windows operating system, IntelliJ IDEA or Eclipse
With the above equipment conditions can meet the new requirements

Expected results:
A set of source programs that can implement the method, a graduation thesis design document, a foreign translation material (English original and translation)



#### Steps to get the app running locally on your computer
 1. install [python](https://www.python.org/downloads/)
 2. install a virtual environment ```pip install virtualenv```
 3. clone or download the repository in a particular directory
 4. in the direcotry where you cloned the repo create a virtual environment ```virtualenv venv```
 4. activate virtual env ```source venv/bin/activate```
 4. install the requirements ```pip install -r requirements.txt```
 5. run migrations ```python manage.py migrate```
 6. start the server ```python manage.py runserver```
 
 
