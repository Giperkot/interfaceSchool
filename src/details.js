import { createChart } from './chart';

export function getDetailsContentLayout(ymaps) {

    let detailTemplate = document.getElementById("detail_template");

  let BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
      detailTemplate.innerHTML,
    {
      build: function () {
          console.log("build");
        BalloonContentLayout.superclass.build.call(this);

        const { details } = this.getData().object.properties;

        if (details) {
          const container = this.getElement().querySelector('.details-chart');

          this.connectionChart = createChart(
            container,
            details.chart,
            details.isActive
          );
        }
      },

      clear: function () {
        if (this.connectionChart) {
          this.connectionChart.destroy();
        }

        BalloonContentLayout.superclass.clear.call(this);
      }
    }
  );

  return BalloonContentLayout;
}
