import apiHandler from "~/utils/ApiHandler";
import {SET_SKILLS} from "~/store/admin/mutations";

export const GET_SKILLS = 'admin/getSkills';

export default {
  async getSkills({commit, state}) {
    try {
      let response = await this.$axios.get('/skills')
      if (apiHandler.isSuccess(response.status)) {
        commit(SET_SKILLS, response.data.data);
        return true
      }
      return false
    } catch (e) {
      console.log(e.response)
      return false
    }
  }
}
