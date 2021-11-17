from selenium.webdriver import Chrome, ChromeOptions


def get_driver():
    options = ChromeOptions()
    options.add_argument("headless")
    options.add_argument("no-sandbox")
    # options.add_argument("window-size=1920x1080")
    # options.add_argument("disable-gpu")

    return Chrome(options=options)
