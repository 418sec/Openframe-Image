// Author: Jonathan Wohl
// Title: Image - fill canvas

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 screen_offset = vec2(-0.5);

    float screen_ratio = u_resolution.x / u_resolution.y;
    float image_ratio = u_tex0Resolution.x / u_tex0Resolution.y;

    if (image_ratio > screen_ratio) {
        // match image height to screen height
        st.x *= screen_ratio / image_ratio;
        st.x += (1. - screen_ratio / image_ratio) / 2.;
    } else {
        // match image width to screen width
        st.y *= image_ratio / screen_ratio;
        st.y += (1. - image_ratio / screen_ratio) / 2.;
    }

    vec3 color = vec3(0.);

    if (st.x >= 0. && st.y >= 0. && st.x <= 1. && st.y <= 1.) {
        color = texture2D(u_tex0, st).rgb;
    }

    color = mix(vec3(0.),color,clamp(u_time*0.5,0.,1.));

    gl_FragColor = vec4(color,1.0);
}