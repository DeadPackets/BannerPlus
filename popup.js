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
      console.log(result);
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

document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((tab) => {
    if (tab.url.indexOf('banner.aus.edu') > -1) {
      initializeSwitches(tab);
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