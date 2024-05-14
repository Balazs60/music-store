
# Music Store  

## About The Project  

We want to create a professional webshop with a music theme because  
instruments and music are both of our interests. Both developers work as  
full-stack developers on the project. We are using technologies such as  
Java, Spring, PostgreSQL, TypeScript, and React.  


## Built With  
Java  
Spring  
Postgresql  
TypeScript  
React  
Tailwind CSS  

## Getting Started  

### Prerequisites  

Java JDK  
Docker Desktop  

### Installation  

#### Clone the repository  

git clone https://github.com/Balazs60/music-store  



#### Fill out the properties in template_env file (optional)  

To enable card payments and chatbot functionality in the webshop,  
you need to fill out the following properties in the template_env file:  

STRIPE_SECRET_KEY = Get your Stripe secret key from the Stripe website.  

GOOGLE_APPLICATION_CREDENTIALS = Get your API credential from Google Cloud Platform  
for the Dialogflow chatbot. You can find the instructions on the Google Cloud Platform  
website. Next download and copy the credentials json file into the src/main/resources folder and  
add the path to here.  

Finally, rename the template_env file to .env   


#### Navigate to the required directory:  

cd music-store/music-store-backend  


#### Run command:  

docker compose up  

#### Use the following port:  

http://localehost:4200/  

## Authors  
Borisz Bisits  
Balázs Füredi  

## Contact  
Balázs Füredi  
LinkedIn: www.linkedin.com/in/balázs60  
Email: f.balozs60@gmail.com  





