import { TextEncoder, TextDecoder as NodeTextDecoder } from "util";

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}

if (!global.TextDecoder) {
  global.TextDecoder = NodeTextDecoder as unknown as typeof TextDecoder;
}
