from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

PATH = "C:\Program Files (x86)\chromedriver.exe"
browser = webdriver.Chrome(PATH)

browser.get("http://www.curvytron.com/#/") #go to curvytron website

browser.find_element_by_id('submit').click() #create room

browser.find_element_by_id("profile-name").send_keys("VFX-BOT") #set profile name

browser.find_element_by_class_name('btn').click() #confirm profile name

browser.find_element_by_class_name('icon-params').click() #open settings

time.sleep(1)

browser.find_element_by_id('open').click() #set room as private

time.sleep(1)

print(browser.current_url) #get url
print('Ready, waiting for players ...')

while True :
    playerNumber = len(browser.find_elements_by_class_name('player-name')) - 1

    ready = len(browser.find_elements_by_class_name('ready'))

    # print(str(playerNumber) + ' ' + str(ready))

    if (playerNumber > 1 and playerNumber == ready) : #check if the players are ready
        break

print("Party launch !")

browser.quit() #quit