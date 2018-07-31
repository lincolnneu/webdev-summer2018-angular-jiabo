import * as constants from '../constants';
const WIDGET_URL = constants.HOST + '/api/topic/';

export class WidgetServiceClient {
  findWidgetsForTopic(topicId) {
    return fetch( WIDGET_URL + topicId + '/widget')
      .then(response => response.json()); // return as json body.
  }

}
