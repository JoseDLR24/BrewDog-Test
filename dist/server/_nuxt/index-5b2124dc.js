import axios from "axios";
import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "ofetch";
import "#internal/nitro";
import "hookable";
import "unctx";
import "devalue";
import "h3";
import "@unhead/ssr";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "ufo";
import "destr";
import "defu";
const _sfc_main = {
  data() {
    return {
      // initialize empty beers array
      beers: []
    };
  },
  // Component is mounted on the DOM
  async mounted() {
    try {
      const response = await axios.get("https://api.punkapi.com/v2/beers?brewed_after=11-2012");
      this.beers = response.data;
    } catch (error) {
      console.error(error);
    }
  },
  computed: {
    sortedBeers() {
      return this.beers.filter((beer) => !this.wordVerification(beer, "centennial")).sort((a, b) => a.abv - b.abv);
    }
  },
  methods: {
    // function to verify the words in order to avoid repetition. pass and received two parameters, beer parameter and a word that is being defined before depending on the needs
    wordVerification(beer, word) {
      return JSON.stringify(beer).toLowerCase().includes(word);
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}><link rel="stylesheet" href="../assets/app.css"><!--[-->`);
  ssrRenderList($options.sortedBeers, (beer) => {
    _push(`<div class="beer-card"><div class="beer-image"><img${ssrRenderAttr("src", beer.image_url)}${ssrRenderAttr("alt", beer.name)}></div><div class="beer-info"><h2>${ssrInterpolate(beer.name)}</h2><p>${ssrInterpolate(beer.tagline)}</p><p>${ssrInterpolate(beer.description)}</p><p>ABV: ${ssrInterpolate(beer.abv)}</p><p>IBU: ${ssrInterpolate(beer.ibu)}</p>`);
    if ($options.wordVerification(beer, "lactose")) {
      _push(`<p class="warning">Contains Lactose⚠</p>`);
    } else {
      _push(`<!---->`);
    }
    if ($options.wordVerification(beer, "dry hop")) {
      _push(`<p class="highlight">Dry Hopped</p>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div></div>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  index as default
};
//# sourceMappingURL=index-5b2124dc.js.map
