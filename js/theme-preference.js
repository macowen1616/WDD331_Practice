/**
 * Theme preference: restore on load (before paint) and persist on change.
 * Load in <head> WITHOUT defer or async.
 */
(() => {
    const ALLOWED = new Set(['light', 'system', 'dark']);
    const id = 'theme-preference-sync';
    
    let stored = null;
    try {
        stored = localStorage.getItem('theme-preference');
    } catch {
        /* storage may be disabled */
    }
    const value = ALLOWED.has(stored) ? stored : 'system';

    window.addEventListener('DOMContentLoaded', () => {
        let container = document.getElementById(id);
        if (!container) {
            container = document.createElement('div');
            container.id = id;
            container.hidden = true;
            container.setAttribute('aria-hidden', 'true');
            ['light', 'system', 'dark'].forEach((v) => {
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'theme-preference';
                input.value = v;
                if (v === 'system') {
                    input.checked = true;
                }
                container.appendChild(input);
            });
            if (document.body) {
                document.body.appendChild(container);
            }
        }

        const input = container.querySelector('input[value="' + value + '"]');
        if (input) {
            input.checked = true;
        }

        const visibleInput = document.querySelector(`input[name="theme-preference"][value="${value}"]`);
        if (visibleInput) {
            visibleInput.checked = true;
        }
    });

    document.addEventListener('change', (e) => {
        if (e.target.name === 'theme-preference') {
            try {
                localStorage.setItem('theme-preference', e.target.value);
                const container = document.getElementById(id);
                if (container) {
                    const syncInput = container.querySelector(`input[value="${e.target.value}"]`);
                    if (syncInput) {
                        syncInput.checked = true;
                    }
                }
            } catch {
                /* storage may be disabled */
            }
        }
    });
})();