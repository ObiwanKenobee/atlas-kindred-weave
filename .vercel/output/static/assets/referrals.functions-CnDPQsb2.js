import{c as e,a}from"./index-Bh1PwMQk.js";import{r as t}from"./auth-middleware-CuDVMoOS.js";const s=e({method:"POST"}).middleware([t]).handler(a("6dfe8318a40e90896a43ad3cde69713b7758ff6aa8eba2a055fb607881f65c0b")),u=e({method:"POST"}).middleware([t]).handler(a("4baeea9f310f289c816e77fcb309aa79ac0354f9775c669c93e6787d14c795ca")),f=e({method:"POST"}).middleware([t]).handler(a("b17cea2c904ee321cedcb968b06020282e9915fbaa2c961ccfee8935f8bfc569"));function l(i){const{channel:c,referrerName:n,shareUrl:r}=i;return c==="sms"?`${n} invited you to Atlas Sanctum — an AI-run regenerative finance OS. Join: ${r}`:c==="whatsapp"?`Hey — ${n} here 👋

I'm using Atlas Sanctum, an AI-run operating system for entrepreneurs building trust, funding, and impact. Signing up with my link gives you an instant Trust Score and credits me too.

Join here: ${r}`:`Subject: You'd love Atlas Sanctum

Hi,

I've been using Atlas Sanctum — an AI-operated economic OS that helps entrepreneurs get funding, verify identity, and prove impact. It's changed how I think about capital.

Sign up with my link and you'll get onboarded with a Trust Score and free access to the Atlas CFO:
${r}

— ${n}`}const m=e({method:"POST"}).middleware([t]).handler(a("489e198573047336314580990ca6a53cce30a3f292f15210d631df0b41176ccd"));export{f as attachReferralCode,l as buildInviteMessage,m as generateInviteMessage,s as getMyReferralOverview,u as getReferralLeaderboard};
