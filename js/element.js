'use strict';

(function () {

  var title = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var type = ['palace', 'flat', 'house', 'bungalo'];
  var rooms = [1, 2, 3, 4, 5];
  var checkin = ['12:00', '13:00', '14:00'];
  var checkout = ['12:00', '13:00', '14:00'];
  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  // var description = '';
  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var randomPrice = function () {
    return Math.floor(Math.random() * 1000000);
  };

  var randomRooms = function () {
    return Math.round(Math.random() * rooms.length);
  };

  var randomGuests = function () {
    return Math.floor(Math.random() * 10);
  };

  var randomLocationX = function (min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  };

  var randomLocationY = function (min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  };

  window.data = [
    {
      'author': {
        'avatar': 'img/avatars/user01.png'
      },

      'offer': {
        'title': title[0],
        'address': 'location.x, location.y',
        'price': randomPrice(),
        'type': type[2],
        'rooms': randomRooms(),
        'guests': randomGuests(),
        'checkin': checkin[0],
        'checkout': checkout[1],
        'features': features,
        'description': '',
        'photos': photos
      },

      'location': {
        'x': randomLocationX(1, 1200),
        'y': randomLocationY(130, 630)
      }
    },
    {
      author: {
        avatar: 'img/avatars/user02.png'
      },

      offer: {
        title: title[1],
        address: 'location.x, location.y',
        price: randomPrice(),
        type: type[1],
        rooms: randomRooms(),
        guests: randomGuests(),
        checkin: checkin[1],
        checkout: checkout[2],
        features: features,
        description: '',
        photos: photos
      },

      location: {
        x: randomLocationX(1, 1200),
        y: randomLocationY(130, 630)
      }
    },
    {
      author: {
        avatar: 'img/avatars/user03.png'
      },

      offer: {
        title: title[2],
        address: 'location.x, location.y',
        price: randomPrice(),
        type: type[2],
        rooms: randomRooms(),
        guests: randomGuests(),
        checkin: checkin[0],
        checkout: checkout[2],
        features: features,
        description: '',
        photos: photos
      },

      location: {
        x: randomLocationX(1, 1200),
        y: randomLocationY(130, 630)
      }
    },
    {
      author: {
        avatar: 'img/avatars/user04.png'
      },

      offer: {
        title: title[3],
        address: 'location.x, location.y',
        price: randomPrice(),
        type: type[0],
        rooms: randomRooms(),
        guests: randomGuests(),
        checkin: checkin[1],
        checkout: checkout[1],
        features: features,
        description: '',
        photos: photos
      },

      location: {
        x: randomLocationX(1, 1200),
        y: randomLocationY(130, 630)
      }
    },
    {
      author: {
        avatar: 'img/avatars/user05.png'
      },

      offer: {
        title: title[4],
        address: 'location.x, location.y',
        price: randomPrice(),
        type: type[3],
        rooms: randomRooms(),
        guests: randomGuests(),
        checkin: checkin[2],
        checkout: checkout[0],
        features: features,
        description: '',
        photos: photos
      },

      location: {
        x: randomLocationX(1, 1200),
        y: randomLocationY(130, 630)
      }
    },
    {
      author: {
        avatar: 'img/avatars/user06.png'
      },

      offer: {
        title: title[5],
        address: 'location.x, location.y',
        price: randomPrice(),
        type: type[3],
        rooms: randomRooms(),
        guests: randomGuests(),
        checkin: checkin[2],
        checkout: checkout[2],
        features: features,
        description: '',
        photos: photos
      },

      location: {
        x: randomLocationX(1, 1200),
        y: randomLocationY(130, 630)
      }
    },
    {
      author: {
        avatar: 'img/avatars/user07.png'
      },

      offer: {
        title: title[6],
        address: 'location.x, location.y',
        price: randomPrice(),
        type: type[1],
        rooms: randomRooms(),
        guests: randomGuests(),
        checkin: checkin[1],
        checkout: checkout[1],
        features: features,
        description: '',
        photos: photos
      },

      location: {
        x: randomLocationX(1, 1200),
        y: randomLocationY(130, 630)
      }
    },
    {
      author: {
        avatar: 'img/avatars/user08.png'
      },

      offer: {
        title: title[7],
        address: 'location.x, location.y',
        price: randomPrice(),
        type: type[0],
        rooms: randomRooms(),
        guests: randomGuests(),
        checkin: checkin[1],
        checkout: checkout[0],
        features: features,
        description: '',
        photos: photos
      },

      location: {
        x: randomLocationX(1, 1200),
        y: randomLocationY(130, 630)
      }
    }
  ];

})();
