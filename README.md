# casinowApp




# Casinow project: 

Scope : This project was carried out as part of the 3rd year entrepreneurship course at CentraleSupelec

Objective : The objective was to develop a complete software solution (mobile application, website, server and deployment) to provide real time information on gambling establishments in France. The key element is to be able to have a real time connection with the establishments to transmit the jackpots of the live games and the state of the tables



## App 

Purpose: app that provides the status of gambling establishments in real time.

Features: 
    * lists of games and updates of their status in real time
    * lists of casinos with descriptions of their services
    * search engine for casinos and games
    * tutorial cards
        
Technologies : 
  * front end app : react native
  * backend : node js 
  * real time connection : socket.io 
  * sms alert system for interesting jackpots: twilio
  * state management : redux
  * database : mongoDB

app link : https://expo.dev/@montassier/casinowApp?serviceType=classic&distribution=expo-go

https://user-images.githubusercontent.com/99366674/200180419-b2ffe4e5-db34-4345-8143-11d4b67c580c.mp4






## Website 


https://casinow.fr/

website of gambling establishments in france

feature : 
   * search engine of establishments by city, name, group, games .....
   * interactive map of France

technologies :

   * front-end : React Js , Typescript
   * Map : leaflet
   * backend : node Js
   * Database: mongoDb 
   * state management: React Context Api

The site is fully manageable from the site casinow--manager.fr



https://user-images.githubusercontent.com/99366674/200322348-ddfd1927-85df-49ce-91d0-a919059964c7.mp4



## Website Manager 

https://casinow--manager.fr/Login

Manager of the casinow website. 

features : 
   * add/remove/update casinos and their information 
   * manage site information (home page images, legal information ....)
   * editor to write game explanations 

technologies : 
   * front-end : React Js ,Typescript
   * Map : leaflet
   * backend : node Js
   * Database: mongoDb 
   * state management: Redux
   * Firestore to store image and firebase to manage authentification


https://user-images.githubusercontent.com/99366674/200178134-50340168-70cc-499a-adf1-bb715631ab4c.mp4


https://user-images.githubusercontent.com/99366674/200178352-87e8824a-deb2-4df4-a341-ae2800cba8fd.mp4




## Scaper Service 

https://casinow--scraper.com/home

automatic scraping of jackpots from machines displayed on gambling websites

features : 
   * screenshot of a web page
   * AI to extract text from an image 
   * retrieves all the last images with text from an instagram account
   * image cropping

technologies : 
   * API : FastApi
   * IA : pytesseract, easyOcr, East model 
   * scraping with selenium
   * javascript/html



https://user-images.githubusercontent.com/99366674/200177164-e4f06b7e-5ce9-4d07-a721-680176d6bbca.mp4



https://user-images.githubusercontent.com/99366674/200177166-1a637cbe-1117-4c95-acde-d758d89a5bdd.mp4



## Deployment 


technologies : 
   * docker, kubernetes
   * Google cloud : registery, cloud run, GKE (google kubernetes engine)










