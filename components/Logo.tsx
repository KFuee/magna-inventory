import { SvgXml } from "react-native-svg";
import { View } from "tamagui";

export default function Logo() {
  // Obtención de ../assets/logo.svg
  const svgMarkup = `
  <?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 12.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 51448)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" [
	<!ENTITY ns_svg "http://www.w3.org/2000/svg">
	<!ENTITY ns_xlink "http://www.w3.org/1999/xlink">
]>
<svg  version="1.1" id="Layer_1" xmlns="&ns_svg;" xmlns:xlink="&ns_xlink;" width="578.666" height="136"
	 viewBox="0 0 578.666 136" overflow="visible" enable-background="new 0 0 578.666 136" xml:space="preserve">
<g>
	<path fill="#ACACAC" d="M149.625,44.427h29.692l10.952,41.698h0.74c0.526-3.473,1.054-7.16,2.002-10.523l8.945-31.175h29.385
		l13.053,79.397h-27.902l-3.901-43.488h-0.522c-0.525,2.631-1.054,5.367-1.896,7.895l-11.477,35.594h-16.847L171.53,90.23
		c-0.843-3.369-1.583-6.527-1.795-9.895h-0.948c-0.207,3.16-0.417,6.422-0.734,9.576l-3.373,33.912h-27.902L149.625,44.427z"/>
	<path fill="#ACACAC" d="M287.099,95.078l-3.368-14.006c-0.842-3.373-1.371-6.846-1.9-10.215h-1.048l-5.268,24.221H287.099z
		 M268.037,123.824h-30.534l27.585-79.397h31.91l28.327,79.397h-30.541l-2.627-9.902h-21.803L268.037,123.824z"/>
	<path fill="#ACACAC" d="M403.763,77.07c-0.217,12.953-0.217,23.797-9.587,33.902c-8.426,9.166-21.372,14.115-33.693,14.115
		c-24.216,0-43.8-14.953-43.8-40.436c0-25.901,19.054-41.488,44.012-41.488c13.794,0,32.751,6.846,38.958,20.429l-26.956,9.901
		c-2.21-4.002-6.315-6.109-10.951-6.109c-10.313,0-16.005,8.845-16.005,18.425c0,8.736,5.476,16.953,14.846,16.953
		c4.532,0,10.322-2.107,11.688-6.949h-13.054V77.07H403.763z"/>
	<path fill="#ACACAC" d="M405.918,44.427h27.698l25.9,44.017h0.839c-1.154-6.635-2.42-13.48-2.42-20.218V44.427h27.585v79.397
		h-27.585l-25.375-41.697h-0.841c0.944,5.471,1.788,10.633,1.788,15.902v25.795h-27.59V44.427z"/>
	<path fill="#ACACAC" d="M532.228,95.078l-3.373-14.006c-0.841-3.373-1.367-6.846-1.897-10.215h-1.051l-5.265,24.221H532.228z
		 M513.168,123.824h-30.536l27.584-79.397h31.907l28.325,79.397h-30.536l-2.632-9.902h-21.795L513.168,123.824z"/>
	<polygon points="92.769,123.902 122.686,123.906 93.875,44.642 71.974,44.638 67.949,55.669 	"/>
	<path fill="#E22E2F" d="M72.479,10.913c-8.027,0-14.533,6.504-14.533,14.536c0,8.022,6.506,14.531,14.533,14.531
		S87.01,33.471,87.01,25.448C87.01,17.417,80.506,10.913,72.479,10.913"/>
	<polygon points="8.218,123.902 52.816,123.898 30.511,62.672 	"/>
	<polygon points="57.875,123.902 87.792,123.906 58.974,44.642 37.076,44.638 33.056,55.669 	"/>
</g>
</svg>
`;
  const SvgImage = () => (
    <SvgXml
      xml={svgMarkup}
      width={"150px"}
      height={"50px"}
    />
  );

  return (
    <View
      width="100%"
      alignItems="center"
    >
      <SvgImage />
    </View>
  );
}