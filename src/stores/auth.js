import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import VueCookies from "vue-cookies";

export const useAuthStore = defineStore("auth", () => {
  const user = ref({});

  const authenticated = ref(false);

  const $cookies = VueCookies;
  const getUser = () => {
    if ($cookies.get("user_session")) {
      user.value = reactive(JSON.parse(localStorage.getItem("userCred"))); // gets user credentials from local storage
      authenticated.value = true;
    } else {
      localStorage.removeItem("userCred");
      authenticated.value = false;
    }
  };
  getUser();

  const setUser = (userData) => {
    user.value = reactive({
      id: userData.id,
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      gender: userData.gender,
      image: userData.image,
    });
    localStorage.setItem("userCred", JSON.stringify(user.value));
    authenticated.value = true;
  };

  const logout = () => {
    localStorage.removeItem("userCred");
    $cookies.remove("user_session");
    user.value = {};
    authenticated.value = false;
  };

  return { authenticated, user, setUser, logout };
});
