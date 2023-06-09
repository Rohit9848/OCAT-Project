import Axios from '../utils/http.config';

export class AssessmentService {

  static submit(assessment) {
    try {
      return Axios.post(`/assessment/submit`, { assessment })
        .then(response => {
          // eslint-disable-next-line no-restricted-globals
          confirm(response.data.message);
          window.location.replace(`/assessment/list2`);
        }).catch((error) => {
          alert(error.response.data.message);
        });
    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }

  static getList() {
    try {
      return Axios.get(`/assessment/list`, {
        params: {
        },
      })
        .then(response => response.data.data.assessments);
    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }

  static deleteAssessment(id) {
    try {
      return Axios.delete(`/assessment/delete/${id}`)
        .then(response => response.data.data.deletedAssessment)
        .catch((error) => {
          alert(error.response.data.message);
        });
    } catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }
}
