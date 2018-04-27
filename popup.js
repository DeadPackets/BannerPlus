/* eslint-disable */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];
    callback(tab);
  });

}

function checkAutoLogin(value, cb) {
  if (value) {
    let username = $('[name="username"]').val();
    let password = $('[name="password"]').val();
    if (username !== '' && password !== '') {
      chrome.storage.sync.set({
        username
      });
      chrome.storage.sync.set({
        password
      });
      chrome.storage.local.set({
        autoLogin: true
      })
    } else {
      cb();
    }
  }
}

function clickSwitch(name, currentValue) {

  if (name == 'autoLogin') {
    checkAutoLogin(currentValue, () => {
      swal({
        title: 'Oops!',
        text: 'Please fill in both the username and password fields.',
        icon: 'warning'
      })
      chrome.storage.local.set({
        autoLogin: false
      });
    })
  } else {
    let data = {};
    data[name] = currentValue;
    chrome.storage.local.set(data);
  }
}

function initializeSwitches(tab) {
  $('.checkbox-switch').each((i, item) => {
    let name = $(item).attr('name');
    if (name == 'autoLogin') {
      chrome.storage.sync.get(['username', 'password'], (result) => {
        $('[name="username"]').val(result.username);
        $('[name="password"]').val(result.password);
      })
    }

    chrome.storage.local.get([name], (result) => {
      if (result[name]) {
        new Switch(item, {
          size: 'default',
          checked: true,
          onChange: (value) => {
            clickSwitch(name, value);
          }
        });
      } else {
        new Switch(item, {
          size: 'default',
          checked: false,
          onChange: (value) => {
            clickSwitch(name, value);
          }
        });
      }
    })
  });
}

function checkForUpdates() {
  fetch(chrome.extension.getURL('version.json'))
    .then((response) => {
      response.json().then((json) => {
        fetch('https://raw.githubusercontent.com/DeadPackets/BannerPlus/master/version.json')
          .then((responseGit) => {
            responseGit.json().then((jsonGit) => {
              if (parseFloat(jsonGit.version) > parseFloat(json.version)) {
                let content = jsonGit.changelog.map((item) => {return (" - " + item);})
                content = content.join("\n");
                swal({
                  title: `New Update! (v${jsonGit.version})`,
                  text: `BannerPlus has a new update!\n\nHere is what's new:\n${content}`,
                  buttons: ['Later', 'Update']
                }).then((value) => {
                  //If they picked to update
                  if (value) {
                      window.open('https://github.com/DeadPackets/BannerPlus/releases/latest');
                  }
                })
              }
            })
          })
      })
    });
}

document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((tab) => {
    if (tab.url.indexOf('banner.aus.edu') > -1) {
      initializeSwitches(tab);
      checkForUpdates();
    } else {
      swal({
        title: 'Sorry!',
        text: 'This extension can only be used on banner.',
        icon: 'warning'
      }).then(() => {
        window.close();
      })
    }
  });
});