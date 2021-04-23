import { NuxtAxiosInstance } from "@nuxtjs/axios";
import {PlaceholderInterface} from "@/plugins/placeholder-api";

declare module "@nuxt/types" {
  interface Context {
    $axios: NuxtAxiosInstance;
    $placeholder: PlaceholderInterface;
  }
}

declare module "@nuxtjs/composition-api" {
  interface Context {
    $axios: NuxtAxiosInstance;
    $placeholder: PlaceholderInterface;
  }
}

declare module "vuex/types/index" {
  interface Store<S> {
    $axios: NuxtAxiosInstance;
    $placeholder: PlaceholderInterface;
  }
}