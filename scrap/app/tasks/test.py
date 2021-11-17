from selenium.webdriver import Chrome, ChromeOptions
from utils.drivers import get_driver


# def get_driver():
#     options = ChromeOptions()
#     options.add_argument("headless")
#     options.add_argument("no-sandbox")
#     # options.add_argument("window-size=1920x1080")
#     # options.add_argument("disable-gpu")
#
#     return Chrome(options=options)


if __name__ == "__main__":
    driver = get_driver()

    with driver:
        driver.get("https://www.naver.com")
        print(driver.page_source)
