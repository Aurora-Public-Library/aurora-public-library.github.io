import ConsoleErrorService from '@bibliocommons/utils-console';
import AirbrakeErrorService from '@bibliocommons/utils-airbrake';

export default {
  initialize(airbrakeConfig) {
    const service = airbrakeConfig.enabled ? new AirbrakeErrorService(airbrakeConfig) : new ConsoleErrorService();

    this.client = service.client;
    this.notify = service.notify.bind(service);
  }
};
