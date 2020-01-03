import {extend} from "vee-validate";
import {required, ext, size, integer} from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required"
});

extend("ext", {
  ...ext,
  message: "Wrong file extensions"
});

extend("size", {
  ...size,
  message: "Wrong file size"
});

extend("integer", {
  ...integer,
  message: "Must be an integer"
});
