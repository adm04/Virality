/**
 * Vantage Virality OS - Interactive WebGL Fluid Mesh Shader Engine
 * Hardware-accelerated dynamic organic gradient mesh with subtle mouse responsiveness.
 * Zero external dependencies. < 8KB footprint. 60 FPS fluidity.
 */

(function () {
  'use strict';

  function initShaderBackground() {
    const canvas = document.getElementById('dynamic-shader-canvas');
    if (!canvas) return;

    // Check WebGL support
    const gl = canvas.getContext('webgl', { powerPreference: 'high-performance', alpha: true, antialias: false, depth: false }) ||
               canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('[Vantage Shader] WebGL not supported on this device, falling back to ambient CSS glow.');
      return;
    }

    // Vertex Shader: full-screen quad
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Smooth multi-octave fluid simplex-gradient waves
    const fragmentShaderSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      // Fast GPU pseudo-random noise generator
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        st.x *= aspect;

        // Subtle mouse influence
        vec2 mouseNorm = (u_mouse / u_resolution) * vec2(aspect, 1.0);
        float mouseDist = length(st - mouseNorm);
        float mouseWave = smoothstep(0.8, 0.0, mouseDist) * 0.15;

        float t = u_time * 0.12;

        // Multi-frequency wave warp
        vec2 q = vec2(0.0);
        q.x = snoise(st + vec2(t * 0.8, t * 0.5) + mouseWave);
        q.y = snoise(st + vec2(t * 0.6, -t * 0.7));

        vec2 r = vec2(0.0);
        r.x = snoise(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * t);
        r.y = snoise(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * t);

        float f = snoise(st + r * 1.4);

        // Curated, vibrant SaaS luxury palette:
        // C1: Deep Emerald Virality Green (#059669 / #10B981)
        vec3 col1 = vec3(0.04, 0.62, 0.44);
        // C2: Electric Indigo / Cyan (#4F46E5 / #06B6D4)
        vec3 col2 = vec3(0.24, 0.38, 0.95);
        // C3: Vibrant Violet Glow (#8B5CF6 / #A855F7)
        vec3 col3 = vec3(0.58, 0.28, 0.92);
        // C4: Warm Sunset Gold Accent (#F59E0B)
        vec3 col4 = vec3(0.96, 0.62, 0.15);
        // C5: Clean Frosted Slate Background (#F8FAFC)
        vec3 colBg = vec3(0.97, 0.98, 1.0);

        // Color blending based on fluid noise contours
        vec3 color = mix(colBg, col1, clamp(length(q) * 0.45, 0.0, 1.0));
        color = mix(color, col2, clamp(length(r.x) * 0.5, 0.0, 1.0));
        color = mix(color, col3, clamp(length(r.y) * 0.4, 0.0, 1.0));
        color = mix(color, col4, clamp(f * f * 0.35, 0.0, 1.0));

        // Filmic subtle dithering to avoid color banding on high-res monitors
        float dither = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * (1.0 / 255.0);
        color += dither;

        gl_FragColor = vec4(color, 0.72);
      }
    `;

    function compileShader(src, type) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('[Vantage Shader] Compilation Error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('[Vantage Shader] Linking Error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Fullscreen quad buffer
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1
    ]), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uResLoc = gl.getUniformLocation(program, 'u_resolution');
    const uMouseLoc = gl.getUniformLocation(program, 'u_mouse');

    let mouseX = window.innerWidth * 0.5;
    let mouseY = window.innerHeight * 0.5;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let isVisible = true;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Cap at 1.5 for silky smooth 60fps on retina
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResLoc, canvas.width, canvas.height);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    window.addEventListener('mousemove', (e) => {
      targetMouseX = e.clientX * (window.devicePixelRatio || 1);
      targetMouseY = (window.innerHeight - e.clientY) * (window.devicePixelRatio || 1);
    }, { passive: true });

    // Idle optimization: pause render loop if tab is not focused or visible
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
    });

    let startTime = performance.now();
    function render(currentTime) {
      if (isVisible) {
        const elapsedTime = (currentTime - startTime) * 0.001;

        // Smooth mouse damping
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        gl.uniform1f(uTimeLoc, elapsedTime);
        gl.uniform2f(uMouseLoc, mouseX, mouseY);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShaderBackground);
  } else {
    initShaderBackground();
  }
})();
