import { Printer, Image } from "@node-escpos/core";
import USB from "@node-escpos/usb-adapter";
import { join } from "path";

const device = new USB();

device.open(async function (err) {
  if (err) {
    console.error(err);
    return;
  }

  // encoding is optional
  const options = { encoding: "BIG5" /* default */ };
  let printer = new Printer(device, options);

  // Path to png image
  const filePath = join("./pikachu.png");
  const image = await Image.load(filePath);

  printer.font("a").align("ct").style("bu").size(1, 1);
  // .barcode(112233445566, "EAN13", { width: 50, height: 50 })
  // .table(["One", "Two", "Three"])
  // .tableCustom(
  //   [
  //     { text: "Left", align: "LEFT", width: 0.33, style: "B" },
  //     { text: "Center", align: "CENTER", width: 0.33 },
  //     { text: "Right", align: "RIGHT", width: 0.33 },
  //   ],
  //   { encoding: "cp857", size: [1, 1] } // Optional
  // );

  // inject qrimage to printer
  //   printer = await printer.qrimage("https://github.com/node-escpos/driver");
  // inject image to printer
  printer = await printer.image(
    image,
    "d8" // changing with image
  );

  printer.cut().close();
});
