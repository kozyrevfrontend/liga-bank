import { mapData } from './mapData';

class Map {
  constructor(data) {
    this.data = data;

    this.initMap = this.initMap.bind(this);
  }

  init() {
    window.addEventListener(`scroll`, this.initMap);
  }

  initMap() {
    if (this.isVisible()) {
      this.insertApi();
      window.removeEventListener(`scroll`, this.initMap);
    }
  }

  isVisible() {
    const map = document.querySelector(`.map`);

    let coords = map.getBoundingClientRect();

    let windowHeight = document.documentElement.clientHeight;

    let topVisible = coords.top > 0 && coords.top < windowHeight;

    return topVisible;
  }

  insertApi() {
    const script = document.createElement(`script`);

    script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=32d3b598-6172-4939-924b-399b27ff4c9b`;

    script.onload = () => {
      this.renderMap();
    };

    document.head.appendChild(script);
  }

  renderMap() {
    window.ymaps.ready(() => {
      const myMap = new window.ymaps.Map(`map`,
        {
          center: [56.838011, 60.597465],
          zoom: 5,
          controls: [`zoomControl`]
        },
        {
          searchControlProvider: 'yandex#search'
        }
      );

      const controlsList = document.querySelector(`.map__controls-list`);
      const checkBoxes = controlsList.querySelectorAll(`.map__checkbox`);

      const addObjectOnMap = (obj) => {
        myMap.geoObjects.add(obj);
      };

      const removeObjectFromMap = (obj) => {
        myMap.geoObjects.remove(obj);
      };

      const checkBoxHandler = (node) => {
        node.addEventListener(`change`, (evt) => {
          this.data[evt.currentTarget.id].forEach((point) => {
            let office = new window.ymaps.Placemark(point, {
              id: evt.currentTarget.id
            },
            {
              iconLayout: 'default#image',
              iconImageHref: 'img/icon-pin.svg',
              iconImageSize: [35, 40],
              iconImageOffset: [-18, -40]
            });

            if (evt.currentTarget.checked) {
              addObjectOnMap(office);
            }

            if (!evt.currentTarget.checked) {
              myMap.geoObjects.each((geoObject) => {
                if (geoObject.properties.get('id') === evt.currentTarget.id) {
                  removeObjectFromMap(geoObject);
                }
              });
            }
          });
        });
      };


      checkBoxes.forEach((checkbox) => {
        checkBoxHandler(checkbox);
      });
    });
  }
}

export const map = new Map(mapData);
