import { default as $ } from "jquery";
import { default as Popper } from "jquery";
global.$ = $;
global.jQuery = $; // This one does the trick for bootstrap!
global.Popper = Popper;
// Boostrap's jQuery dependency only works with require, not with ES6 import!