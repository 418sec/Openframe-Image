// Author: Jonathan Wohl
// Title: Image - stretch to canvas

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 screen_offset = vec2(-.5);

    vec3 color = vec3(0.);

    // map texture to color vec3
    if (st.x >= 0. && st.y >= 0. && st.x <= 1. && st.y <= 1.) {
        color = texture2D(u_tex0, st).rgb;
    }

    // fade in
    color = mix(vec3(0.),color,clamp(u_time*0.5,0.,1.));

    gl_FragColor = vec4(color,1.0);
}