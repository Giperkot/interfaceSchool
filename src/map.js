import { loadList, loadDetails } from './api';
import { getDetailsContentLayout } from './details';
import { createFilterControl } from './filter';

export function initMap(ymaps, containerId) {
  const myMap = new ymaps.Map(containerId, {
    center: [55.76, 37.64],
    controls: [],
    zoom: 10
  }, {
      searchControlProvider: 'yandex#search'
  });

  const objectManager = new ymaps.ObjectManager({
    clusterize: true,
    gridSize: 64,
    clusterIconLayout: 'default#pieChart',
    clusterDisableClickZoom: false,
    geoObjectOpenBalloonOnClick: false,
    geoObjectHideIconOnBalloonOpen: false,
    geoObjectBalloonContentLayout: getDetailsContentLayout(ymaps)
  });

  loadList().then(data => {
      objectManager.add(data.features);
  });

    objectManager.objects.events.add('click', function (event) {
        const objectId = event.get('objectId');
        const obj = objectManager.objects.getById(objectId);

        objectManager.objects.balloon.open(objectId);

        if (!obj.properties.details) {
            loadDetails(objectId).then(data => {
                obj.properties.details = data;
                objectManager.objects.balloon.setData(obj);
            });
        }
    });

    myMap.geoObjects.add(objectManager);

  // filters
  const listBoxControl = createFilterControl(ymaps);
  myMap.controls.add(listBoxControl);

  var filterMonitor = new ymaps.Monitor(listBoxControl.state);
  filterMonitor.add('filters', filters => {
    objectManager.setFilter(
      obj => filters[obj.isActive ? 'active' : 'defective']
    );
  });
}
