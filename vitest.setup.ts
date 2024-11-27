import { TextEncoder, TextDecoder as NodeTextDecoder } from "util";
import "@testing-library/jest-dom";

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}

if (!global.TextDecoder) {
  global.TextDecoder = NodeTextDecoder as unknown as typeof TextDecoder;
}
