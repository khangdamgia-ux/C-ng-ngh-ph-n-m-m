/* Dùng chung cho 3 trang: gọi API, lưu token, escape HTML */
var TM = {
  get tok() { try { return localStorage.getItem('tm_tok'); } catch (e) { return null; } },
  set tok(v) { try { v ? localStorage.setItem('tm_tok', v) : localStorage.removeItem('tm_tok'); } catch (e) {} },
  esc: function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); },
  api: async function (p, o) {
    o = o || {}; var h = { 'content-type': 'application/json' };
    if (TM.tok) h.authorization = 'Bearer ' + TM.tok;
    var r = await fetch('/api/' + p, { method: o.method || 'GET', headers: h, body: o.body ? JSON.stringify(o.body) : undefined });
    var d = await r.json().catch(function () { return {}; });
    if (!r.ok) { var e = new Error(d.error || 'Lỗi ' + r.status); e.status = r.status; throw e; }
    return d;
  },
  // Đã đăng nhập hợp lệ thì trả về user, không thì null
  me: async function () { if (!TM.tok) return null; try { return await TM.api('auth/me'); } catch (e) { TM.tok = null; return null; } },
  togglePw: function (btn) { var i = btn.parentNode.querySelector('input'); i.type = i.type === 'password' ? 'text' : 'password'; btn.textContent = i.type === 'password' ? 'Hiện' : 'Ẩn'; }
};
