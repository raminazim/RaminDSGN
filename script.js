
:root {
	--cream: #10100f;
	--paper: #181816;
	--ink: #f2eee5;
	--soft-ink: #aaa59a;
	--line: rgba(242, 238, 229, 0.2);
	--muted-ink: #262622;
	--serif: Georgia, 'Times New Roman', serif;
	--sans: 'Manrope', sans-serif;
	--mono: 'DM Mono', monospace;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--cream); color: var(--ink); font-family: var(--sans); line-height: 1.5; }
a { color: inherit; }
.site-shell { width: min(100% - 64px, 1320px); margin: auto; }
.scroll-progress { position: fixed; z-index: 10; top: 0; left: 0; width: 100%; height: 4px; background: transparent; }
.scroll-progress span { display: block; width: 0; height: 100%; background: var(--ink); transition: width .1s linear; }
.site-header { display: flex; align-items: center; justify-content: space-between; min-height: 92px; border-bottom: 1px solid var(--line); }
.brand { display: inline-flex; align-items: center; text-decoration: none; }
.brand img { display: block; width: 116px; height: auto; filter: invert(1); }
.maintenance-notice { display: flex; align-items: center; gap: 12px; margin-left: auto; margin-right: 40px; color: var(--ink); font: 500 clamp(.78rem, 1.2vw, 1rem) var(--mono); letter-spacing: .04em; text-transform: uppercase; animation: maintenanceBounce 2.8s ease-in-out infinite; }
.maintenance-notice span { display: block; width: 9px; height: 9px; border: 1px solid var(--ink); border-radius: 50%; animation: maintenancePulse 2.8s ease-in-out infinite; }
.site-nav { display: flex; gap: 28px; }
.site-nav a, .footer-social { font: 500 .68rem var(--mono); letter-spacing: .02em; text-decoration: none; text-transform: uppercase; }
.site-nav a:hover, .footer-social:hover, .footer-bottom a:hover { text-decoration: underline; text-underline-offset: 4px; }
.menu-toggle { display: none; border: 0; background: transparent; font: 500 .68rem var(--mono); text-transform: uppercase; }
.section-grid { display: grid; grid-template-columns: 1fr; }
.hero { position: relative; min-height: 820px; align-items: center; justify-items: center; padding: 110px 0 80px; border-bottom: 1px solid var(--line); text-align: center; }
.kicker { margin: 0 0 22px; color: var(--soft-ink); font: 500 .67rem var(--mono); letter-spacing: .05em; text-transform: uppercase; }
h1, h2, h3, p { margin-top: 0; }
h1, h2 { letter-spacing: -.075em; line-height: .92; }
h1 { max-width: 1000px; margin-bottom: 30px; font-size: clamp(4rem, 9.6vw, 9.5rem); font-weight: 700; }
h1 em, h2 em { color: var(--soft-ink); font-family: var(--serif); font-weight: 400; }
.hero-intro { max-width: 520px; margin: 0 auto 34px; color: var(--soft-ink); font-size: 1rem; }
.text-link { display: inline-flex; align-items: center; gap: 14px; padding-bottom: 7px; border-bottom: 1px solid var(--ink); font: 500 .72rem var(--mono); text-decoration: none; text-transform: uppercase; }
.text-link span { font-size: 1.1rem; transition: transform .25s ease; }
.text-link:hover span { transform: translate(4px, -4px); }
.hero-mark { position: relative; display: grid; place-items: center; width: min(31vw, 390px); aspect-ratio: 1; margin-top: 70px; border-radius: 50%; background: var(--ink); color: var(--cream); overflow: hidden; }
.hero-logo { z-index: 1; display: block; width: 54%; height: auto; }
.orbit { position: absolute; width: 76%; height: 26%; border: 1px solid rgba(242,238,229,.45); border-radius: 50%; transform: rotate(-38deg); }
.orbit-two { width: 110%; height: 43%; transform: rotate(42deg); border-color: rgba(242,238,229,.28); }
.hero-meta { display: flex; justify-content: space-between; width: 100%; align-self: end; margin-top: 80px; color: var(--soft-ink); font: .65rem var(--mono); text-transform: uppercase; text-align: left; }
.scroll-note b { color: var(--ink); font-size: 1rem; font-weight: 400; }
.manifesto { display: grid; grid-template-columns: .7fr 1.7fr .8fr; gap: 5%; padding: 170px 0 190px; }
.manifesto h2, .section-heading h2 { margin: 0; font-size: clamp(3rem, 6vw, 6.5rem); }
.manifesto > p:last-child { align-self: end; margin-bottom: 3px; color: var(--soft-ink); font-size: .9rem; }
.work-section { border-top: 1px solid var(--line); padding: 105px 0 160px; }
.section-heading { display: grid; grid-template-columns: .7fr 1.7fr; gap: 5%; margin-bottom: 90px; }
.service-list { border-top: 1px solid var(--line); }
.service-row { display: grid; grid-template-columns: .7fr 1.2fr 1.7fr .2fr; gap: 4%; align-items: center; padding: 28px 0; border-bottom: 1px solid var(--line); }
.service-number { color: var(--soft-ink); font: .68rem var(--mono); }
.service-row h3 { margin: 0; font-size: clamp(1.45rem, 2.4vw, 2.35rem); letter-spacing: -.06em; }
.service-row p { max-width: 320px; margin: 0; color: var(--soft-ink); font-size: .86rem; }
.service-arrow { justify-self: end; font-size: 1.5rem; transition: transform .25s ease; }
.service-row:hover .service-arrow { transform: translate(5px, -5px); }
.approach { padding: 130px 0 160px; border-top: 1px solid var(--line); }
.approach-copy { align-self: end; max-width: 360px; color: var(--soft-ink); font-size: 1.1rem; }
.approach-copy .text-link { margin-top: 32px; color: var(--ink); }
.contact-section { padding: 135px 8% 160px; background: var(--paper); color: var(--ink); text-align: center; }
.contact-section .kicker { color: var(--soft-ink); }
.contact-section h2 { margin-left: auto; margin-right: auto; }
.contact-section h2 { max-width: 760px; margin-bottom: 70px; font-size: clamp(4rem, 11vw, 10.5rem); }
.contact-email { display: inline-flex; align-items: center; gap: 18px; border-bottom: 1px solid var(--ink); padding-bottom: 9px; font: .76rem var(--mono); text-decoration: none; }
.contact-email span { font-size: 1.2rem; transition: transform .25s ease; }
.contact-email:hover span { transform: translate(4px, -4px); }
.site-footer { padding: 54px 0 34px; }
.footer-top, .footer-bottom { display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.footer-top { padding-bottom: 70px; }
.footer-top p, .footer-bottom, .legal-notes { color: var(--soft-ink); font: .63rem var(--mono); }
.footer-top p { margin: 0; }
.footer-bottom { padding-top: 20px; border-top: 1px solid var(--line); text-transform: uppercase; }
.footer-bottom div { display: flex; gap: 20px; }
.footer-bottom a { text-decoration: none; }
.legal-notes { display: grid; grid-template-columns: 1fr 1fr; gap: 8%; margin-top: 90px; padding-top: 24px; border-top: 1px solid var(--line); }
.legal-notes h3 { color: var(--ink); font: 500 .67rem var(--mono); text-transform: uppercase; }
.legal-notes p { max-width: 520px; margin: 0; line-height: 1.7; }
.reveal { opacity: 0; transform: translateY(28px); transition: opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1); }
.reveal.is-visible { opacity: 1; transform: translateY(0); }
.reveal-delay { transition-delay: .16s; }
@keyframes maintenanceBounce {
	0%, 100% { transform: translateY(0); }
	50% { transform: translateY(-6px); }
}
@keyframes maintenancePulse {
	0%, 100% { transform: scale(1); opacity: .65; }
	50% { transform: scale(1.35); opacity: 1; }
}
@media (max-width: 760px) {
	.site-shell { width: min(100% - 36px, 1320px); }
	.site-header { min-height: 74px; }
	.maintenance-notice { position: absolute; top: 80px; right: 18px; left: 18px; justify-content: center; margin: 0; }
	.menu-toggle { display: block; }
	.menu-toggle span { display: inline-block; width: 5px; height: 5px; margin-left: 5px; border-radius: 50%; background: var(--ink); }
	.site-nav { position: absolute; z-index: 5; top: 74px; right: 18px; left: 18px; display: none; flex-direction: column; gap: 0; padding: 8px 0; background: var(--ink); }
	.site-nav.is-open { display: flex; }
	.site-nav a { padding: 15px 18px; color: var(--cream); }
	.section-grid, .manifesto, .section-heading { grid-template-columns: 1fr; }
	.hero { min-height: auto; padding: 105px 0 45px; }
	h1 { font-size: clamp(3.8rem, 19vw, 7rem); }
	.hero-mark { width: min(75vw, 330px); margin: 75px auto 0; justify-self: center; }
	.hero-meta { flex-wrap: wrap; gap: 16px; margin-top: 75px; }
	.scroll-note { width: 100%; }
	.manifesto { gap: 48px; padding: 105px 0 125px; }
	.manifesto h2, .section-heading h2 { font-size: clamp(3rem, 15vw, 5rem); }
	.work-section, .approach { padding: 90px 0 110px; }
	.section-heading { gap: 30px; margin-bottom: 55px; }
	.service-row { grid-template-columns: 45px 1fr 25px; gap: 12px; }
	.service-row p { grid-column: 2 / 3; }
	.service-arrow { grid-column: 3; grid-row: 1; }
	.contact-section { padding: 100px 24px 110px; margin: 0 -18px; }
	.contact-section h2 { margin-bottom: 55px; font-size: clamp(3.8rem, 18vw, 7rem); }
	.contact-email { font-size: .64rem; }
	.footer-top, .footer-bottom { align-items: flex-start; flex-direction: column; }
	.footer-top { gap: 24px; padding-bottom: 50px; }
	.footer-bottom { gap: 15px; }
	.footer-bottom div { order: -1; }
	.legal-notes { grid-template-columns: 1fr; gap: 35px; margin-top: 70px; }
}
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; } .reveal { opacity: 1; transform: none; } }
