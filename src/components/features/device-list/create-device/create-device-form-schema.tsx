import { z } from "zod";

export const useCreateDeviceFormSchema = () => {
  return z.object({
    name: z.string().trim().min(2, "You have to provide name for deivce"),
    mac: z
      .string()
      .trim()
      .toUpperCase()
      .min(2, "You have to provide device MAC Address")
      .regex(
        /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
        "Provide valid MAC address"
      ),
    ipv4: z
      .string()
      .trim()
      .min(2, "You have to provide IP of a device")
      .ip({ version: "v4", message: "Provide valid IP v4 address" }),
    firmwareVersion: z
      .string()
      .trim()
      .min(2, "You have to provide firmware version")
      .regex(
        //https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
        /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/,
        "Provide version in SemVer form "
      ),
  });
};
