import { Component, lazy, Suspense, useEffect, useState, useRef, type ReactNode } from 'react';

const Shader = lazy(() => import('./MissingTracksShaderBackground').then(m => ({ default: m.MissingTracksShaderBackground })));

class ShaderBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

/** Keep the green backdrop on every device; load WebGL only for suitable desktops. */
export function ShaderBackdrop() {
  const [enabled, setEnabled] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const desktop = matchMedia('(min-width: 768px) and (pointer: fine)');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let timer: ReturnType<typeof setTimeout>;
    const update = () => {
      clearTimeout(timer);
      setEnabled(false);
      if (desktop.matches && !reduced.matches && !document.hidden && !connection?.saveData) {
        // Let the route's text and controls paint before loading the 3D stack.
        timer = setTimeout(() => setEnabled(true), 800);
      }
    };
    const contextLost = () => setFailed(true);
    const element = backdropRef.current;
    element?.addEventListener('webglcontextlost', contextLost, true);
    update();
    desktop.addEventListener('change', update);
    reduced.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      clearTimeout(timer);
      element?.removeEventListener('webglcontextlost', contextLost, true);
      desktop.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);
  return (
    <div className="mt-shader-background" aria-hidden="true" ref={backdropRef}>
      {enabled && !failed ? <ShaderBoundary><Suspense fallback={null}><Shader /></Suspense></ShaderBoundary> : null}
    </div>
  );
}
