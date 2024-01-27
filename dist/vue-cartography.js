import { defineComponent as Ni, onMounted as $i, openBlock as Ai, createElementBlock as Mi } from "vue";
class lt {
  constructor() {
    this._partials = new Float64Array(32), this._n = 0;
  }
  add(n) {
    const e = this._partials;
    let i = 0;
    for (let r = 0; r < this._n && r < 32; r++) {
      const o = e[r], u = n + o, a = Math.abs(n) < Math.abs(o) ? n - (u - o) : o - (u - n);
      a && (e[i++] = a), n = u;
    }
    return e[i] = n, this._n = i + 1, this;
  }
  valueOf() {
    const n = this._partials;
    let e = this._n, i, r, o, u = 0;
    if (e > 0) {
      for (u = n[--e]; e > 0 && (i = u, r = n[--e], u = i + r, o = r - (u - i), !o); )
        ;
      e > 0 && (o < 0 && n[e - 1] < 0 || o > 0 && n[e - 1] > 0) && (r = o * 2, i = u + r, r == i - u && (u = i));
    }
    return u;
  }
}
function* Ri(t) {
  for (const n of t)
    yield* n;
}
function Fe(t) {
  return Array.from(Ri(t));
}
var Ci = { value: () => {
} };
function Le() {
  for (var t = 0, n = arguments.length, e = {}, i; t < n; ++t) {
    if (!(i = arguments[t] + "") || i in e || /[\s.]/.test(i))
      throw new Error("illegal type: " + i);
    e[i] = [];
  }
  return new Wt(e);
}
function Wt(t) {
  this._ = t;
}
function ki(t, n) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var i = "", r = e.indexOf(".");
    if (r >= 0 && (i = e.slice(r + 1), e = e.slice(0, r)), e && !n.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    return { type: e, name: i };
  });
}
Wt.prototype = Le.prototype = {
  constructor: Wt,
  on: function(t, n) {
    var e = this._, i = ki(t + "", e), r, o = -1, u = i.length;
    if (arguments.length < 2) {
      for (; ++o < u; )
        if ((r = (t = i[o]).type) && (r = Ti(e[r], t.name)))
          return r;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < u; )
      if (r = (t = i[o]).type)
        e[r] = te(e[r], t.name, n);
      else if (n == null)
        for (r in e)
          e[r] = te(e[r], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, n = this._;
    for (var e in n)
      t[e] = n[e].slice();
    return new Wt(t);
  },
  call: function(t, n) {
    if ((r = arguments.length - 2) > 0)
      for (var e = new Array(r), i = 0, r, o; i < r; ++i)
        e[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (o = this._[t], i = 0, r = o.length; i < r; ++i)
      o[i].value.apply(n, e);
  },
  apply: function(t, n, e) {
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (var i = this._[t], r = 0, o = i.length; r < o; ++r)
      i[r].value.apply(n, e);
  }
};
function Ti(t, n) {
  for (var e = 0, i = t.length, r; e < i; ++e)
    if ((r = t[e]).name === n)
      return r.value;
}
function te(t, n, e) {
  for (var i = 0, r = t.length; i < r; ++i)
    if (t[i].name === n) {
      t[i] = Ci, t = t.slice(0, i).concat(t.slice(i + 1));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var Nn = "http://www.w3.org/1999/xhtml";
const ne = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Nn,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function dn(t) {
  var n = t += "", e = n.indexOf(":");
  return e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)), ne.hasOwnProperty(n) ? { space: ne[n], local: t } : t;
}
function Pi(t) {
  return function() {
    var n = this.ownerDocument, e = this.namespaceURI;
    return e === Nn && n.documentElement.namespaceURI === Nn ? n.createElement(t) : n.createElementNS(e, t);
  };
}
function bi(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function qe(t) {
  var n = dn(t);
  return (n.local ? bi : Pi)(n);
}
function Ii() {
}
function Gn(t) {
  return t == null ? Ii : function() {
    return this.querySelector(t);
  };
}
function Fi(t) {
  typeof t != "function" && (t = Gn(t));
  for (var n = this._groups, e = n.length, i = new Array(e), r = 0; r < e; ++r)
    for (var o = n[r], u = o.length, a = i[r] = new Array(u), s, l, f = 0; f < u; ++f)
      (s = o[f]) && (l = t.call(s, s.__data__, f, o)) && ("__data__" in s && (l.__data__ = s.__data__), a[f] = l);
  return new z(i, this._parents);
}
function Li(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function qi() {
  return [];
}
function He(t) {
  return t == null ? qi : function() {
    return this.querySelectorAll(t);
  };
}
function Hi(t) {
  return function() {
    return Li(t.apply(this, arguments));
  };
}
function Di(t) {
  typeof t == "function" ? t = Hi(t) : t = He(t);
  for (var n = this._groups, e = n.length, i = [], r = [], o = 0; o < e; ++o)
    for (var u = n[o], a = u.length, s, l = 0; l < a; ++l)
      (s = u[l]) && (i.push(t.call(s, s.__data__, l, u)), r.push(s));
  return new z(i, r);
}
function De(t) {
  return function() {
    return this.matches(t);
  };
}
function Xe(t) {
  return function(n) {
    return n.matches(t);
  };
}
var Xi = Array.prototype.find;
function Oi(t) {
  return function() {
    return Xi.call(this.children, t);
  };
}
function zi() {
  return this.firstElementChild;
}
function Yi(t) {
  return this.select(t == null ? zi : Oi(typeof t == "function" ? t : Xe(t)));
}
var Bi = Array.prototype.filter;
function Vi() {
  return Array.from(this.children);
}
function Gi(t) {
  return function() {
    return Bi.call(this.children, t);
  };
}
function Ui(t) {
  return this.selectAll(t == null ? Vi : Gi(typeof t == "function" ? t : Xe(t)));
}
function Zi(t) {
  typeof t != "function" && (t = De(t));
  for (var n = this._groups, e = n.length, i = new Array(e), r = 0; r < e; ++r)
    for (var o = n[r], u = o.length, a = i[r] = [], s, l = 0; l < u; ++l)
      (s = o[l]) && t.call(s, s.__data__, l, o) && a.push(s);
  return new z(i, this._parents);
}
function Oe(t) {
  return new Array(t.length);
}
function Ki() {
  return new z(this._enter || this._groups.map(Oe), this._parents);
}
function tn(t, n) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = n;
}
tn.prototype = {
  constructor: tn,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, n) {
    return this._parent.insertBefore(t, n);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function Wi(t) {
  return function() {
    return t;
  };
}
function Ji(t, n, e, i, r, o) {
  for (var u = 0, a, s = n.length, l = o.length; u < l; ++u)
    (a = n[u]) ? (a.__data__ = o[u], i[u] = a) : e[u] = new tn(t, o[u]);
  for (; u < s; ++u)
    (a = n[u]) && (r[u] = a);
}
function Qi(t, n, e, i, r, o, u) {
  var a, s, l = /* @__PURE__ */ new Map(), f = n.length, c = o.length, h = new Array(f), p;
  for (a = 0; a < f; ++a)
    (s = n[a]) && (h[a] = p = u.call(s, s.__data__, a, n) + "", l.has(p) ? r[a] = s : l.set(p, s));
  for (a = 0; a < c; ++a)
    p = u.call(t, o[a], a, o) + "", (s = l.get(p)) ? (i[a] = s, s.__data__ = o[a], l.delete(p)) : e[a] = new tn(t, o[a]);
  for (a = 0; a < f; ++a)
    (s = n[a]) && l.get(h[a]) === s && (r[a] = s);
}
function ji(t) {
  return t.__data__;
}
function tr(t, n) {
  if (!arguments.length)
    return Array.from(this, ji);
  var e = n ? Qi : Ji, i = this._parents, r = this._groups;
  typeof t != "function" && (t = Wi(t));
  for (var o = r.length, u = new Array(o), a = new Array(o), s = new Array(o), l = 0; l < o; ++l) {
    var f = i[l], c = r[l], h = c.length, p = nr(t.call(f, f && f.__data__, l, i)), g = p.length, _ = a[l] = new Array(g), v = u[l] = new Array(g), E = s[l] = new Array(h);
    e(f, c, _, v, E, p, n);
    for (var w = 0, x = 0, y, S; w < g; ++w)
      if (y = _[w]) {
        for (w >= x && (x = w + 1); !(S = v[x]) && ++x < g; )
          ;
        y._next = S || null;
      }
  }
  return u = new z(u, i), u._enter = a, u._exit = s, u;
}
function nr(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function er() {
  return new z(this._exit || this._groups.map(Oe), this._parents);
}
function ir(t, n, e) {
  var i = this.enter(), r = this, o = this.exit();
  return typeof t == "function" ? (i = t(i), i && (i = i.selection())) : i = i.append(t + ""), n != null && (r = n(r), r && (r = r.selection())), e == null ? o.remove() : e(o), i && r ? i.merge(r).order() : r;
}
function rr(t) {
  for (var n = t.selection ? t.selection() : t, e = this._groups, i = n._groups, r = e.length, o = i.length, u = Math.min(r, o), a = new Array(r), s = 0; s < u; ++s)
    for (var l = e[s], f = i[s], c = l.length, h = a[s] = new Array(c), p, g = 0; g < c; ++g)
      (p = l[g] || f[g]) && (h[g] = p);
  for (; s < r; ++s)
    a[s] = e[s];
  return new z(a, this._parents);
}
function or() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var i = t[n], r = i.length - 1, o = i[r], u; --r >= 0; )
      (u = i[r]) && (o && u.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(u, o), o = u);
  return this;
}
function ur(t) {
  t || (t = ar);
  function n(c, h) {
    return c && h ? t(c.__data__, h.__data__) : !c - !h;
  }
  for (var e = this._groups, i = e.length, r = new Array(i), o = 0; o < i; ++o) {
    for (var u = e[o], a = u.length, s = r[o] = new Array(a), l, f = 0; f < a; ++f)
      (l = u[f]) && (s[f] = l);
    s.sort(n);
  }
  return new z(r, this._parents).order();
}
function ar(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function fr() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function sr() {
  return Array.from(this);
}
function lr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var i = t[n], r = 0, o = i.length; r < o; ++r) {
      var u = i[r];
      if (u)
        return u;
    }
  return null;
}
function cr() {
  let t = 0;
  for (const n of this)
    ++t;
  return t;
}
function hr() {
  return !this.node();
}
function pr(t) {
  for (var n = this._groups, e = 0, i = n.length; e < i; ++e)
    for (var r = n[e], o = 0, u = r.length, a; o < u; ++o)
      (a = r[o]) && t.call(a, a.__data__, o, r);
  return this;
}
function gr(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function dr(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function vr(t, n) {
  return function() {
    this.setAttribute(t, n);
  };
}
function _r(t, n) {
  return function() {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function yr(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function wr(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e);
  };
}
function xr(t, n) {
  var e = dn(t);
  if (arguments.length < 2) {
    var i = this.node();
    return e.local ? i.getAttributeNS(e.space, e.local) : i.getAttribute(e);
  }
  return this.each((n == null ? e.local ? dr : gr : typeof n == "function" ? e.local ? wr : yr : e.local ? _r : vr)(e, n));
}
function ze(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function mr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Sr(t, n, e) {
  return function() {
    this.style.setProperty(t, n, e);
  };
}
function Er(t, n, e) {
  return function() {
    var i = n.apply(this, arguments);
    i == null ? this.style.removeProperty(t) : this.style.setProperty(t, i, e);
  };
}
function Nr(t, n, e) {
  return arguments.length > 1 ? this.each((n == null ? mr : typeof n == "function" ? Er : Sr)(t, n, e ?? "")) : yt(this.node(), t);
}
function yt(t, n) {
  return t.style.getPropertyValue(n) || ze(t).getComputedStyle(t, null).getPropertyValue(n);
}
function $r(t) {
  return function() {
    delete this[t];
  };
}
function Ar(t, n) {
  return function() {
    this[t] = n;
  };
}
function Mr(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : this[t] = e;
  };
}
function Rr(t, n) {
  return arguments.length > 1 ? this.each((n == null ? $r : typeof n == "function" ? Mr : Ar)(t, n)) : this.node()[t];
}
function Ye(t) {
  return t.trim().split(/^|\s+/);
}
function Un(t) {
  return t.classList || new Be(t);
}
function Be(t) {
  this._node = t, this._names = Ye(t.getAttribute("class") || "");
}
Be.prototype = {
  add: function(t) {
    var n = this._names.indexOf(t);
    n < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var n = this._names.indexOf(t);
    n >= 0 && (this._names.splice(n, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function Ve(t, n) {
  for (var e = Un(t), i = -1, r = n.length; ++i < r; )
    e.add(n[i]);
}
function Ge(t, n) {
  for (var e = Un(t), i = -1, r = n.length; ++i < r; )
    e.remove(n[i]);
}
function Cr(t) {
  return function() {
    Ve(this, t);
  };
}
function kr(t) {
  return function() {
    Ge(this, t);
  };
}
function Tr(t, n) {
  return function() {
    (n.apply(this, arguments) ? Ve : Ge)(this, t);
  };
}
function Pr(t, n) {
  var e = Ye(t + "");
  if (arguments.length < 2) {
    for (var i = Un(this.node()), r = -1, o = e.length; ++r < o; )
      if (!i.contains(e[r]))
        return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? Tr : n ? Cr : kr)(e, n));
}
function br() {
  this.textContent = "";
}
function Ir(t) {
  return function() {
    this.textContent = t;
  };
}
function Fr(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function Lr(t) {
  return arguments.length ? this.each(t == null ? br : (typeof t == "function" ? Fr : Ir)(t)) : this.node().textContent;
}
function qr() {
  this.innerHTML = "";
}
function Hr(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Dr(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function Xr(t) {
  return arguments.length ? this.each(t == null ? qr : (typeof t == "function" ? Dr : Hr)(t)) : this.node().innerHTML;
}
function Or() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function zr() {
  return this.each(Or);
}
function Yr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Br() {
  return this.each(Yr);
}
function Vr(t) {
  var n = typeof t == "function" ? t : qe(t);
  return this.select(function() {
    return this.appendChild(n.apply(this, arguments));
  });
}
function Gr() {
  return null;
}
function Ur(t, n) {
  var e = typeof t == "function" ? t : qe(t), i = n == null ? Gr : typeof n == "function" ? n : Gn(n);
  return this.select(function() {
    return this.insertBefore(e.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Zr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Kr() {
  return this.each(Zr);
}
function Wr() {
  var t = this.cloneNode(!1), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Jr() {
  var t = this.cloneNode(!0), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function Qr(t) {
  return this.select(t ? Jr : Wr);
}
function jr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function to(t) {
  return function(n) {
    t.call(this, n, this.__data__);
  };
}
function no(t) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var e = "", i = n.indexOf(".");
    return i >= 0 && (e = n.slice(i + 1), n = n.slice(0, i)), { type: n, name: e };
  });
}
function eo(t) {
  return function() {
    var n = this.__on;
    if (n) {
      for (var e = 0, i = -1, r = n.length, o; e < r; ++e)
        o = n[e], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : n[++i] = o;
      ++i ? n.length = i : delete this.__on;
    }
  };
}
function io(t, n, e) {
  return function() {
    var i = this.__on, r, o = to(n);
    if (i) {
      for (var u = 0, a = i.length; u < a; ++u)
        if ((r = i[u]).type === t.type && r.name === t.name) {
          this.removeEventListener(r.type, r.listener, r.options), this.addEventListener(r.type, r.listener = o, r.options = e), r.value = n;
          return;
        }
    }
    this.addEventListener(t.type, o, e), r = { type: t.type, name: t.name, value: n, listener: o, options: e }, i ? i.push(r) : this.__on = [r];
  };
}
function ro(t, n, e) {
  var i = no(t + ""), r, o = i.length, u;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var s = 0, l = a.length, f; s < l; ++s)
        for (r = 0, f = a[s]; r < o; ++r)
          if ((u = i[r]).type === f.type && u.name === f.name)
            return f.value;
    }
    return;
  }
  for (a = n ? io : eo, r = 0; r < o; ++r)
    this.each(a(i[r], n, e));
  return this;
}
function Ue(t, n, e) {
  var i = ze(t), r = i.CustomEvent;
  typeof r == "function" ? r = new r(n, e) : (r = i.document.createEvent("Event"), e ? (r.initEvent(n, e.bubbles, e.cancelable), r.detail = e.detail) : r.initEvent(n, !1, !1)), t.dispatchEvent(r);
}
function oo(t, n) {
  return function() {
    return Ue(this, t, n);
  };
}
function uo(t, n) {
  return function() {
    return Ue(this, t, n.apply(this, arguments));
  };
}
function ao(t, n) {
  return this.each((typeof n == "function" ? uo : oo)(t, n));
}
function* fo() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var i = t[n], r = 0, o = i.length, u; r < o; ++r)
      (u = i[r]) && (yield u);
}
var Ze = [null];
function z(t, n) {
  this._groups = t, this._parents = n;
}
function Xt() {
  return new z([[document.documentElement]], Ze);
}
function so() {
  return this;
}
z.prototype = Xt.prototype = {
  constructor: z,
  select: Fi,
  selectAll: Di,
  selectChild: Yi,
  selectChildren: Ui,
  filter: Zi,
  data: tr,
  enter: Ki,
  exit: er,
  join: ir,
  merge: rr,
  selection: so,
  order: or,
  sort: ur,
  call: fr,
  nodes: sr,
  node: lr,
  size: cr,
  empty: hr,
  each: pr,
  attr: xr,
  style: Nr,
  property: Rr,
  classed: Pr,
  text: Lr,
  html: Xr,
  raise: zr,
  lower: Br,
  append: Vr,
  insert: Ur,
  remove: Kr,
  clone: Qr,
  datum: jr,
  on: ro,
  dispatch: ao,
  [Symbol.iterator]: fo
};
function lo(t) {
  return typeof t == "string" ? new z([[document.querySelector(t)]], [document.documentElement]) : new z([[t]], Ze);
}
function Zn(t, n, e) {
  t.prototype = n.prototype = e, e.constructor = t;
}
function Ke(t, n) {
  var e = Object.create(t.prototype);
  for (var i in n)
    e[i] = n[i];
  return e;
}
function Ot() {
}
var Pt = 0.7, nn = 1 / Pt, _t = "\\s*([+-]?\\d+)\\s*", bt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Q = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", co = /^#([0-9a-f]{3,8})$/, ho = new RegExp(`^rgb\\(${_t},${_t},${_t}\\)$`), po = new RegExp(`^rgb\\(${Q},${Q},${Q}\\)$`), go = new RegExp(`^rgba\\(${_t},${_t},${_t},${bt}\\)$`), vo = new RegExp(`^rgba\\(${Q},${Q},${Q},${bt}\\)$`), _o = new RegExp(`^hsl\\(${bt},${Q},${Q}\\)$`), yo = new RegExp(`^hsla\\(${bt},${Q},${Q},${bt}\\)$`), ee = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Zn(Ot, It, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: ie,
  // Deprecated! Use color.formatHex.
  formatHex: ie,
  formatHex8: wo,
  formatHsl: xo,
  formatRgb: re,
  toString: re
});
function ie() {
  return this.rgb().formatHex();
}
function wo() {
  return this.rgb().formatHex8();
}
function xo() {
  return We(this).formatHsl();
}
function re() {
  return this.rgb().formatRgb();
}
function It(t) {
  var n, e;
  return t = (t + "").trim().toLowerCase(), (n = co.exec(t)) ? (e = n[1].length, n = parseInt(n[1], 16), e === 6 ? oe(n) : e === 3 ? new X(n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, (n & 15) << 4 | n & 15, 1) : e === 8 ? Yt(n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, (n & 255) / 255) : e === 4 ? Yt(n >> 12 & 15 | n >> 8 & 240, n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, ((n & 15) << 4 | n & 15) / 255) : null) : (n = ho.exec(t)) ? new X(n[1], n[2], n[3], 1) : (n = po.exec(t)) ? new X(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, 1) : (n = go.exec(t)) ? Yt(n[1], n[2], n[3], n[4]) : (n = vo.exec(t)) ? Yt(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, n[4]) : (n = _o.exec(t)) ? fe(n[1], n[2] / 100, n[3] / 100, 1) : (n = yo.exec(t)) ? fe(n[1], n[2] / 100, n[3] / 100, n[4]) : ee.hasOwnProperty(t) ? oe(ee[t]) : t === "transparent" ? new X(NaN, NaN, NaN, 0) : null;
}
function oe(t) {
  return new X(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Yt(t, n, e, i) {
  return i <= 0 && (t = n = e = NaN), new X(t, n, e, i);
}
function mo(t) {
  return t instanceof Ot || (t = It(t)), t ? (t = t.rgb(), new X(t.r, t.g, t.b, t.opacity)) : new X();
}
function $n(t, n, e, i) {
  return arguments.length === 1 ? mo(t) : new X(t, n, e, i ?? 1);
}
function X(t, n, e, i) {
  this.r = +t, this.g = +n, this.b = +e, this.opacity = +i;
}
Zn(X, $n, Ke(Ot, {
  brighter(t) {
    return t = t == null ? nn : Math.pow(nn, t), new X(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Pt : Math.pow(Pt, t), new X(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new X(st(this.r), st(this.g), st(this.b), en(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: ue,
  // Deprecated! Use color.formatHex.
  formatHex: ue,
  formatHex8: So,
  formatRgb: ae,
  toString: ae
}));
function ue() {
  return `#${ft(this.r)}${ft(this.g)}${ft(this.b)}`;
}
function So() {
  return `#${ft(this.r)}${ft(this.g)}${ft(this.b)}${ft((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function ae() {
  const t = en(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${st(this.r)}, ${st(this.g)}, ${st(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function en(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function st(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function ft(t) {
  return t = st(t), (t < 16 ? "0" : "") + t.toString(16);
}
function fe(t, n, e, i) {
  return i <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN), new Z(t, n, e, i);
}
function We(t) {
  if (t instanceof Z)
    return new Z(t.h, t.s, t.l, t.opacity);
  if (t instanceof Ot || (t = It(t)), !t)
    return new Z();
  if (t instanceof Z)
    return t;
  t = t.rgb();
  var n = t.r / 255, e = t.g / 255, i = t.b / 255, r = Math.min(n, e, i), o = Math.max(n, e, i), u = NaN, a = o - r, s = (o + r) / 2;
  return a ? (n === o ? u = (e - i) / a + (e < i) * 6 : e === o ? u = (i - n) / a + 2 : u = (n - e) / a + 4, a /= s < 0.5 ? o + r : 2 - o - r, u *= 60) : a = s > 0 && s < 1 ? 0 : u, new Z(u, a, s, t.opacity);
}
function Eo(t, n, e, i) {
  return arguments.length === 1 ? We(t) : new Z(t, n, e, i ?? 1);
}
function Z(t, n, e, i) {
  this.h = +t, this.s = +n, this.l = +e, this.opacity = +i;
}
Zn(Z, Eo, Ke(Ot, {
  brighter(t) {
    return t = t == null ? nn : Math.pow(nn, t), new Z(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Pt : Math.pow(Pt, t), new Z(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, n = isNaN(t) || isNaN(this.s) ? 0 : this.s, e = this.l, i = e + (e < 0.5 ? e : 1 - e) * n, r = 2 * e - i;
    return new X(
      yn(t >= 240 ? t - 240 : t + 120, r, i),
      yn(t, r, i),
      yn(t < 120 ? t + 240 : t - 120, r, i),
      this.opacity
    );
  },
  clamp() {
    return new Z(se(this.h), Bt(this.s), Bt(this.l), en(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = en(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${se(this.h)}, ${Bt(this.s) * 100}%, ${Bt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function se(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Bt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function yn(t, n, e) {
  return (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n) * 255;
}
const Je = (t) => () => t;
function No(t, n) {
  return function(e) {
    return t + e * n;
  };
}
function $o(t, n, e) {
  return t = Math.pow(t, e), n = Math.pow(n, e) - t, e = 1 / e, function(i) {
    return Math.pow(t + i * n, e);
  };
}
function Ao(t) {
  return (t = +t) == 1 ? Qe : function(n, e) {
    return e - n ? $o(n, e, t) : Je(isNaN(n) ? e : n);
  };
}
function Qe(t, n) {
  var e = n - t;
  return e ? No(t, e) : Je(isNaN(t) ? n : t);
}
const le = function t(n) {
  var e = Ao(n);
  function i(r, o) {
    var u = e((r = $n(r)).r, (o = $n(o)).r), a = e(r.g, o.g), s = e(r.b, o.b), l = Qe(r.opacity, o.opacity);
    return function(f) {
      return r.r = u(f), r.g = a(f), r.b = s(f), r.opacity = l(f), r + "";
    };
  }
  return i.gamma = t, i;
}(1);
function ut(t, n) {
  return t = +t, n = +n, function(e) {
    return t * (1 - e) + n * e;
  };
}
var An = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, wn = new RegExp(An.source, "g");
function Mo(t) {
  return function() {
    return t;
  };
}
function Ro(t) {
  return function(n) {
    return t(n) + "";
  };
}
function Co(t, n) {
  var e = An.lastIndex = wn.lastIndex = 0, i, r, o, u = -1, a = [], s = [];
  for (t = t + "", n = n + ""; (i = An.exec(t)) && (r = wn.exec(n)); )
    (o = r.index) > e && (o = n.slice(e, o), a[u] ? a[u] += o : a[++u] = o), (i = i[0]) === (r = r[0]) ? a[u] ? a[u] += r : a[++u] = r : (a[++u] = null, s.push({ i: u, x: ut(i, r) })), e = wn.lastIndex;
  return e < n.length && (o = n.slice(e), a[u] ? a[u] += o : a[++u] = o), a.length < 2 ? s[0] ? Ro(s[0].x) : Mo(n) : (n = s.length, function(l) {
    for (var f = 0, c; f < n; ++f)
      a[(c = s[f]).i] = c.x(l);
    return a.join("");
  });
}
var ce = 180 / Math.PI, Mn = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function je(t, n, e, i, r, o) {
  var u, a, s;
  return (u = Math.sqrt(t * t + n * n)) && (t /= u, n /= u), (s = t * e + n * i) && (e -= t * s, i -= n * s), (a = Math.sqrt(e * e + i * i)) && (e /= a, i /= a, s /= a), t * i < n * e && (t = -t, n = -n, s = -s, u = -u), {
    translateX: r,
    translateY: o,
    rotate: Math.atan2(n, t) * ce,
    skewX: Math.atan(s) * ce,
    scaleX: u,
    scaleY: a
  };
}
var Vt;
function ko(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return n.isIdentity ? Mn : je(n.a, n.b, n.c, n.d, n.e, n.f);
}
function To(t) {
  return t == null || (Vt || (Vt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Vt.setAttribute("transform", t), !(t = Vt.transform.baseVal.consolidate())) ? Mn : (t = t.matrix, je(t.a, t.b, t.c, t.d, t.e, t.f));
}
function ti(t, n, e, i) {
  function r(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, f, c, h, p, g) {
    if (l !== c || f !== h) {
      var _ = p.push("translate(", null, n, null, e);
      g.push({ i: _ - 4, x: ut(l, c) }, { i: _ - 2, x: ut(f, h) });
    } else
      (c || h) && p.push("translate(" + c + n + h + e);
  }
  function u(l, f, c, h) {
    l !== f ? (l - f > 180 ? f += 360 : f - l > 180 && (l += 360), h.push({ i: c.push(r(c) + "rotate(", null, i) - 2, x: ut(l, f) })) : f && c.push(r(c) + "rotate(" + f + i);
  }
  function a(l, f, c, h) {
    l !== f ? h.push({ i: c.push(r(c) + "skewX(", null, i) - 2, x: ut(l, f) }) : f && c.push(r(c) + "skewX(" + f + i);
  }
  function s(l, f, c, h, p, g) {
    if (l !== c || f !== h) {
      var _ = p.push(r(p) + "scale(", null, ",", null, ")");
      g.push({ i: _ - 4, x: ut(l, c) }, { i: _ - 2, x: ut(f, h) });
    } else
      (c !== 1 || h !== 1) && p.push(r(p) + "scale(" + c + "," + h + ")");
  }
  return function(l, f) {
    var c = [], h = [];
    return l = t(l), f = t(f), o(l.translateX, l.translateY, f.translateX, f.translateY, c, h), u(l.rotate, f.rotate, c, h), a(l.skewX, f.skewX, c, h), s(l.scaleX, l.scaleY, f.scaleX, f.scaleY, c, h), l = f = null, function(p) {
      for (var g = -1, _ = h.length, v; ++g < _; )
        c[(v = h[g]).i] = v.x(p);
      return c.join("");
    };
  };
}
var Po = ti(ko, "px, ", "px)", "deg)"), bo = ti(To, ", ", ")", ")"), wt = 0, Nt = 0, Et = 0, ni = 1e3, rn, $t, on = 0, ct = 0, vn = 0, Ft = typeof performance == "object" && performance.now ? performance : Date, ei = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Kn() {
  return ct || (ei(Io), ct = Ft.now() + vn);
}
function Io() {
  ct = 0;
}
function un() {
  this._call = this._time = this._next = null;
}
un.prototype = ii.prototype = {
  constructor: un,
  restart: function(t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    e = (e == null ? Kn() : +e) + (n == null ? 0 : +n), !this._next && $t !== this && ($t ? $t._next = this : rn = this, $t = this), this._call = t, this._time = e, Rn();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Rn());
  }
};
function ii(t, n, e) {
  var i = new un();
  return i.restart(t, n, e), i;
}
function Fo() {
  Kn(), ++wt;
  for (var t = rn, n; t; )
    (n = ct - t._time) >= 0 && t._call.call(void 0, n), t = t._next;
  --wt;
}
function he() {
  ct = (on = Ft.now()) + vn, wt = Nt = 0;
  try {
    Fo();
  } finally {
    wt = 0, qo(), ct = 0;
  }
}
function Lo() {
  var t = Ft.now(), n = t - on;
  n > ni && (vn -= n, on = t);
}
function qo() {
  for (var t, n = rn, e, i = 1 / 0; n; )
    n._call ? (i > n._time && (i = n._time), t = n, n = n._next) : (e = n._next, n._next = null, n = t ? t._next = e : rn = e);
  $t = t, Rn(i);
}
function Rn(t) {
  if (!wt) {
    Nt && (Nt = clearTimeout(Nt));
    var n = t - ct;
    n > 24 ? (t < 1 / 0 && (Nt = setTimeout(he, t - Ft.now() - vn)), Et && (Et = clearInterval(Et))) : (Et || (on = Ft.now(), Et = setInterval(Lo, ni)), wt = 1, ei(he));
  }
}
function pe(t, n, e) {
  var i = new un();
  return n = n == null ? 0 : +n, i.restart((r) => {
    i.stop(), t(r + n);
  }, n, e), i;
}
var Ho = Le("start", "end", "cancel", "interrupt"), Do = [], ri = 0, ge = 1, Cn = 2, Jt = 3, de = 4, kn = 5, Qt = 6;
function _n(t, n, e, i, r, o) {
  var u = t.__transition;
  if (!u)
    t.__transition = {};
  else if (e in u)
    return;
  Xo(t, e, {
    name: n,
    index: i,
    // For context during callback.
    group: r,
    // For context during callback.
    on: Ho,
    tween: Do,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: ri
  });
}
function Wn(t, n) {
  var e = K(t, n);
  if (e.state > ri)
    throw new Error("too late; already scheduled");
  return e;
}
function j(t, n) {
  var e = K(t, n);
  if (e.state > Jt)
    throw new Error("too late; already running");
  return e;
}
function K(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n]))
    throw new Error("transition not found");
  return e;
}
function Xo(t, n, e) {
  var i = t.__transition, r;
  i[n] = e, e.timer = ii(o, 0, e.time);
  function o(l) {
    e.state = ge, e.timer.restart(u, e.delay, e.time), e.delay <= l && u(l - e.delay);
  }
  function u(l) {
    var f, c, h, p;
    if (e.state !== ge)
      return s();
    for (f in i)
      if (p = i[f], p.name === e.name) {
        if (p.state === Jt)
          return pe(u);
        p.state === de ? (p.state = Qt, p.timer.stop(), p.on.call("interrupt", t, t.__data__, p.index, p.group), delete i[f]) : +f < n && (p.state = Qt, p.timer.stop(), p.on.call("cancel", t, t.__data__, p.index, p.group), delete i[f]);
      }
    if (pe(function() {
      e.state === Jt && (e.state = de, e.timer.restart(a, e.delay, e.time), a(l));
    }), e.state = Cn, e.on.call("start", t, t.__data__, e.index, e.group), e.state === Cn) {
      for (e.state = Jt, r = new Array(h = e.tween.length), f = 0, c = -1; f < h; ++f)
        (p = e.tween[f].value.call(t, t.__data__, e.index, e.group)) && (r[++c] = p);
      r.length = c + 1;
    }
  }
  function a(l) {
    for (var f = l < e.duration ? e.ease.call(null, l / e.duration) : (e.timer.restart(s), e.state = kn, 1), c = -1, h = r.length; ++c < h; )
      r[c].call(t, f);
    e.state === kn && (e.on.call("end", t, t.__data__, e.index, e.group), s());
  }
  function s() {
    e.state = Qt, e.timer.stop(), delete i[n];
    for (var l in i)
      return;
    delete t.__transition;
  }
}
function Oo(t, n) {
  var e = t.__transition, i, r, o = !0, u;
  if (e) {
    n = n == null ? null : n + "";
    for (u in e) {
      if ((i = e[u]).name !== n) {
        o = !1;
        continue;
      }
      r = i.state > Cn && i.state < kn, i.state = Qt, i.timer.stop(), i.on.call(r ? "interrupt" : "cancel", t, t.__data__, i.index, i.group), delete e[u];
    }
    o && delete t.__transition;
  }
}
function zo(t) {
  return this.each(function() {
    Oo(this, t);
  });
}
function Yo(t, n) {
  var e, i;
  return function() {
    var r = j(this, t), o = r.tween;
    if (o !== e) {
      i = e = o;
      for (var u = 0, a = i.length; u < a; ++u)
        if (i[u].name === n) {
          i = i.slice(), i.splice(u, 1);
          break;
        }
    }
    r.tween = i;
  };
}
function Bo(t, n, e) {
  var i, r;
  if (typeof e != "function")
    throw new Error();
  return function() {
    var o = j(this, t), u = o.tween;
    if (u !== i) {
      r = (i = u).slice();
      for (var a = { name: n, value: e }, s = 0, l = r.length; s < l; ++s)
        if (r[s].name === n) {
          r[s] = a;
          break;
        }
      s === l && r.push(a);
    }
    o.tween = r;
  };
}
function Vo(t, n) {
  var e = this._id;
  if (t += "", arguments.length < 2) {
    for (var i = K(this.node(), e).tween, r = 0, o = i.length, u; r < o; ++r)
      if ((u = i[r]).name === t)
        return u.value;
    return null;
  }
  return this.each((n == null ? Yo : Bo)(e, t, n));
}
function Jn(t, n, e) {
  var i = t._id;
  return t.each(function() {
    var r = j(this, i);
    (r.value || (r.value = {}))[n] = e.apply(this, arguments);
  }), function(r) {
    return K(r, i).value[n];
  };
}
function oi(t, n) {
  var e;
  return (typeof n == "number" ? ut : n instanceof It ? le : (e = It(n)) ? (n = e, le) : Co)(t, n);
}
function Go(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Uo(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Zo(t, n, e) {
  var i, r = e + "", o;
  return function() {
    var u = this.getAttribute(t);
    return u === r ? null : u === i ? o : o = n(i = u, e);
  };
}
function Ko(t, n, e) {
  var i, r = e + "", o;
  return function() {
    var u = this.getAttributeNS(t.space, t.local);
    return u === r ? null : u === i ? o : o = n(i = u, e);
  };
}
function Wo(t, n, e) {
  var i, r, o;
  return function() {
    var u, a = e(this), s;
    return a == null ? void this.removeAttribute(t) : (u = this.getAttribute(t), s = a + "", u === s ? null : u === i && s === r ? o : (r = s, o = n(i = u, a)));
  };
}
function Jo(t, n, e) {
  var i, r, o;
  return function() {
    var u, a = e(this), s;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (u = this.getAttributeNS(t.space, t.local), s = a + "", u === s ? null : u === i && s === r ? o : (r = s, o = n(i = u, a)));
  };
}
function Qo(t, n) {
  var e = dn(t), i = e === "transform" ? bo : oi;
  return this.attrTween(t, typeof n == "function" ? (e.local ? Jo : Wo)(e, i, Jn(this, "attr." + t, n)) : n == null ? (e.local ? Uo : Go)(e) : (e.local ? Ko : Zo)(e, i, n));
}
function jo(t, n) {
  return function(e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function tu(t, n) {
  return function(e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function nu(t, n) {
  var e, i;
  function r() {
    var o = n.apply(this, arguments);
    return o !== i && (e = (i = o) && tu(t, o)), e;
  }
  return r._value = n, r;
}
function eu(t, n) {
  var e, i;
  function r() {
    var o = n.apply(this, arguments);
    return o !== i && (e = (i = o) && jo(t, o)), e;
  }
  return r._value = n, r;
}
function iu(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2)
    return (e = this.tween(e)) && e._value;
  if (n == null)
    return this.tween(e, null);
  if (typeof n != "function")
    throw new Error();
  var i = dn(t);
  return this.tween(e, (i.local ? nu : eu)(i, n));
}
function ru(t, n) {
  return function() {
    Wn(this, t).delay = +n.apply(this, arguments);
  };
}
function ou(t, n) {
  return n = +n, function() {
    Wn(this, t).delay = n;
  };
}
function uu(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? ru : ou)(n, t)) : K(this.node(), n).delay;
}
function au(t, n) {
  return function() {
    j(this, t).duration = +n.apply(this, arguments);
  };
}
function fu(t, n) {
  return n = +n, function() {
    j(this, t).duration = n;
  };
}
function su(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? au : fu)(n, t)) : K(this.node(), n).duration;
}
function lu(t, n) {
  if (typeof n != "function")
    throw new Error();
  return function() {
    j(this, t).ease = n;
  };
}
function cu(t) {
  var n = this._id;
  return arguments.length ? this.each(lu(n, t)) : K(this.node(), n).ease;
}
function hu(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    if (typeof e != "function")
      throw new Error();
    j(this, t).ease = e;
  };
}
function pu(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(hu(this._id, t));
}
function gu(t) {
  typeof t != "function" && (t = De(t));
  for (var n = this._groups, e = n.length, i = new Array(e), r = 0; r < e; ++r)
    for (var o = n[r], u = o.length, a = i[r] = [], s, l = 0; l < u; ++l)
      (s = o[l]) && t.call(s, s.__data__, l, o) && a.push(s);
  return new ot(i, this._parents, this._name, this._id);
}
function du(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var n = this._groups, e = t._groups, i = n.length, r = e.length, o = Math.min(i, r), u = new Array(i), a = 0; a < o; ++a)
    for (var s = n[a], l = e[a], f = s.length, c = u[a] = new Array(f), h, p = 0; p < f; ++p)
      (h = s[p] || l[p]) && (c[p] = h);
  for (; a < i; ++a)
    u[a] = n[a];
  return new ot(u, this._parents, this._name, this._id);
}
function vu(t) {
  return (t + "").trim().split(/^|\s+/).every(function(n) {
    var e = n.indexOf(".");
    return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
  });
}
function _u(t, n, e) {
  var i, r, o = vu(n) ? Wn : j;
  return function() {
    var u = o(this, t), a = u.on;
    a !== i && (r = (i = a).copy()).on(n, e), u.on = r;
  };
}
function yu(t, n) {
  var e = this._id;
  return arguments.length < 2 ? K(this.node(), e).on.on(t) : this.each(_u(e, t, n));
}
function wu(t) {
  return function() {
    var n = this.parentNode;
    for (var e in this.__transition)
      if (+e !== t)
        return;
    n && n.removeChild(this);
  };
}
function xu() {
  return this.on("end.remove", wu(this._id));
}
function mu(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = Gn(t));
  for (var i = this._groups, r = i.length, o = new Array(r), u = 0; u < r; ++u)
    for (var a = i[u], s = a.length, l = o[u] = new Array(s), f, c, h = 0; h < s; ++h)
      (f = a[h]) && (c = t.call(f, f.__data__, h, a)) && ("__data__" in f && (c.__data__ = f.__data__), l[h] = c, _n(l[h], n, e, h, l, K(f, e)));
  return new ot(o, this._parents, n, e);
}
function Su(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = He(t));
  for (var i = this._groups, r = i.length, o = [], u = [], a = 0; a < r; ++a)
    for (var s = i[a], l = s.length, f, c = 0; c < l; ++c)
      if (f = s[c]) {
        for (var h = t.call(f, f.__data__, c, s), p, g = K(f, e), _ = 0, v = h.length; _ < v; ++_)
          (p = h[_]) && _n(p, n, e, _, h, g);
        o.push(h), u.push(f);
      }
  return new ot(o, u, n, e);
}
var Eu = Xt.prototype.constructor;
function Nu() {
  return new Eu(this._groups, this._parents);
}
function $u(t, n) {
  var e, i, r;
  return function() {
    var o = yt(this, t), u = (this.style.removeProperty(t), yt(this, t));
    return o === u ? null : o === e && u === i ? r : r = n(e = o, i = u);
  };
}
function ui(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Au(t, n, e) {
  var i, r = e + "", o;
  return function() {
    var u = yt(this, t);
    return u === r ? null : u === i ? o : o = n(i = u, e);
  };
}
function Mu(t, n, e) {
  var i, r, o;
  return function() {
    var u = yt(this, t), a = e(this), s = a + "";
    return a == null && (s = a = (this.style.removeProperty(t), yt(this, t))), u === s ? null : u === i && s === r ? o : (r = s, o = n(i = u, a));
  };
}
function Ru(t, n) {
  var e, i, r, o = "style." + n, u = "end." + o, a;
  return function() {
    var s = j(this, t), l = s.on, f = s.value[o] == null ? a || (a = ui(n)) : void 0;
    (l !== e || r !== f) && (i = (e = l).copy()).on(u, r = f), s.on = i;
  };
}
function Cu(t, n, e) {
  var i = (t += "") == "transform" ? Po : oi;
  return n == null ? this.styleTween(t, $u(t, i)).on("end.style." + t, ui(t)) : typeof n == "function" ? this.styleTween(t, Mu(t, i, Jn(this, "style." + t, n))).each(Ru(this._id, t)) : this.styleTween(t, Au(t, i, n), e).on("end.style." + t, null);
}
function ku(t, n, e) {
  return function(i) {
    this.style.setProperty(t, n.call(this, i), e);
  };
}
function Tu(t, n, e) {
  var i, r;
  function o() {
    var u = n.apply(this, arguments);
    return u !== r && (i = (r = u) && ku(t, u, e)), i;
  }
  return o._value = n, o;
}
function Pu(t, n, e) {
  var i = "style." + (t += "");
  if (arguments.length < 2)
    return (i = this.tween(i)) && i._value;
  if (n == null)
    return this.tween(i, null);
  if (typeof n != "function")
    throw new Error();
  return this.tween(i, Tu(t, n, e ?? ""));
}
function bu(t) {
  return function() {
    this.textContent = t;
  };
}
function Iu(t) {
  return function() {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function Fu(t) {
  return this.tween("text", typeof t == "function" ? Iu(Jn(this, "text", t)) : bu(t == null ? "" : t + ""));
}
function Lu(t) {
  return function(n) {
    this.textContent = t.call(this, n);
  };
}
function qu(t) {
  var n, e;
  function i() {
    var r = t.apply(this, arguments);
    return r !== e && (n = (e = r) && Lu(r)), n;
  }
  return i._value = t, i;
}
function Hu(t) {
  var n = "text";
  if (arguments.length < 1)
    return (n = this.tween(n)) && n._value;
  if (t == null)
    return this.tween(n, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(n, qu(t));
}
function Du() {
  for (var t = this._name, n = this._id, e = ai(), i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var u = i[o], a = u.length, s, l = 0; l < a; ++l)
      if (s = u[l]) {
        var f = K(s, n);
        _n(s, t, e, l, u, {
          time: f.time + f.delay + f.duration,
          delay: 0,
          duration: f.duration,
          ease: f.ease
        });
      }
  return new ot(i, this._parents, t, e);
}
function Xu() {
  var t, n, e = this, i = e._id, r = e.size();
  return new Promise(function(o, u) {
    var a = { value: u }, s = { value: function() {
      --r === 0 && o();
    } };
    e.each(function() {
      var l = j(this, i), f = l.on;
      f !== t && (n = (t = f).copy(), n._.cancel.push(a), n._.interrupt.push(a), n._.end.push(s)), l.on = n;
    }), r === 0 && o();
  });
}
var Ou = 0;
function ot(t, n, e, i) {
  this._groups = t, this._parents = n, this._name = e, this._id = i;
}
function ai() {
  return ++Ou;
}
var et = Xt.prototype;
ot.prototype = {
  constructor: ot,
  select: mu,
  selectAll: Su,
  selectChild: et.selectChild,
  selectChildren: et.selectChildren,
  filter: gu,
  merge: du,
  selection: Nu,
  transition: Du,
  call: et.call,
  nodes: et.nodes,
  node: et.node,
  size: et.size,
  empty: et.empty,
  each: et.each,
  on: yu,
  attr: Qo,
  attrTween: iu,
  style: Cu,
  styleTween: Pu,
  text: Fu,
  textTween: Hu,
  remove: xu,
  tween: Vo,
  delay: uu,
  duration: su,
  ease: cu,
  easeVarying: pu,
  end: Xu,
  [Symbol.iterator]: et[Symbol.iterator]
};
function zu(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Yu = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: zu
};
function Bu(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${n} not found`);
  return e;
}
function Vu(t) {
  var n, e;
  t instanceof ot ? (n = t._id, t = t._name) : (n = ai(), (e = Yu).time = Kn(), t = t == null ? null : t + "");
  for (var i = this._groups, r = i.length, o = 0; o < r; ++o)
    for (var u = i[o], a = u.length, s, l = 0; l < a; ++l)
      (s = u[l]) && _n(s, t, n, l, u, e || Bu(s, n));
  return new ot(i, this._parents, t, n);
}
Xt.prototype.interrupt = zo;
Xt.prototype.transition = Vu;
function Gu(t) {
  if (!t.ok)
    throw new Error(t.status + " " + t.statusText);
  if (!(t.status === 204 || t.status === 205))
    return t.json();
}
function Uu(t, n) {
  return fetch(t, n).then(Gu);
}
var T = 1e-6, Zu = 1e-12, A = Math.PI, V = A / 2, ve = A / 4, U = A * 2, it = 180 / A, O = A / 180, b = Math.abs, Ku = Math.atan, Lt = Math.atan2, F = Math.cos, L = Math.sin, Wu = Math.sign || function(t) {
  return t > 0 ? 1 : t < 0 ? -1 : 0;
}, pt = Math.sqrt;
function Ju(t) {
  return t > 1 ? 0 : t < -1 ? A : Math.acos(t);
}
function qt(t) {
  return t > 1 ? V : t < -1 ? -V : Math.asin(t);
}
function G() {
}
function an(t, n) {
  t && ye.hasOwnProperty(t.type) && ye[t.type](t, n);
}
var _e = {
  Feature: function(t, n) {
    an(t.geometry, n);
  },
  FeatureCollection: function(t, n) {
    for (var e = t.features, i = -1, r = e.length; ++i < r; )
      an(e[i].geometry, n);
  }
}, ye = {
  Sphere: function(t, n) {
    n.sphere();
  },
  Point: function(t, n) {
    t = t.coordinates, n.point(t[0], t[1], t[2]);
  },
  MultiPoint: function(t, n) {
    for (var e = t.coordinates, i = -1, r = e.length; ++i < r; )
      t = e[i], n.point(t[0], t[1], t[2]);
  },
  LineString: function(t, n) {
    Tn(t.coordinates, n, 0);
  },
  MultiLineString: function(t, n) {
    for (var e = t.coordinates, i = -1, r = e.length; ++i < r; )
      Tn(e[i], n, 0);
  },
  Polygon: function(t, n) {
    we(t.coordinates, n);
  },
  MultiPolygon: function(t, n) {
    for (var e = t.coordinates, i = -1, r = e.length; ++i < r; )
      we(e[i], n);
  },
  GeometryCollection: function(t, n) {
    for (var e = t.geometries, i = -1, r = e.length; ++i < r; )
      an(e[i], n);
  }
};
function Tn(t, n, e) {
  var i = -1, r = t.length - e, o;
  for (n.lineStart(); ++i < r; )
    o = t[i], n.point(o[0], o[1], o[2]);
  n.lineEnd();
}
function we(t, n) {
  var e = -1, i = t.length;
  for (n.polygonStart(); ++e < i; )
    Tn(t[e], n, 1);
  n.polygonEnd();
}
function dt(t, n) {
  t && _e.hasOwnProperty(t.type) ? _e[t.type](t, n) : an(t, n);
}
function Pn(t) {
  return [Lt(t[1], t[0]), qt(t[2])];
}
function xt(t) {
  var n = t[0], e = t[1], i = F(e);
  return [i * F(n), i * L(n), L(e)];
}
function Gt(t, n) {
  return t[0] * n[0] + t[1] * n[1] + t[2] * n[2];
}
function fn(t, n) {
  return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]];
}
function xn(t, n) {
  t[0] += n[0], t[1] += n[1], t[2] += n[2];
}
function Ut(t, n) {
  return [t[0] * n, t[1] * n, t[2] * n];
}
function bn(t) {
  var n = pt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
  t[0] /= n, t[1] /= n, t[2] /= n;
}
function In(t, n) {
  function e(i, r) {
    return i = t(i, r), n(i[0], i[1]);
  }
  return t.invert && n.invert && (e.invert = function(i, r) {
    return i = n.invert(i, r), i && t.invert(i[0], i[1]);
  }), e;
}
function Fn(t, n) {
  return b(t) > A && (t -= Math.round(t / U) * U), [t, n];
}
Fn.invert = Fn;
function Qu(t, n, e) {
  return (t %= U) ? n || e ? In(me(t), Se(n, e)) : me(t) : n || e ? Se(n, e) : Fn;
}
function xe(t) {
  return function(n, e) {
    return n += t, b(n) > A && (n -= Math.round(n / U) * U), [n, e];
  };
}
function me(t) {
  var n = xe(t);
  return n.invert = xe(-t), n;
}
function Se(t, n) {
  var e = F(t), i = L(t), r = F(n), o = L(n);
  function u(a, s) {
    var l = F(s), f = F(a) * l, c = L(a) * l, h = L(s), p = h * e + f * i;
    return [
      Lt(c * r - p * o, f * e - h * i),
      qt(p * r + c * o)
    ];
  }
  return u.invert = function(a, s) {
    var l = F(s), f = F(a) * l, c = L(a) * l, h = L(s), p = h * r - c * o;
    return [
      Lt(c * r + h * o, f * e + p * i),
      qt(p * e - f * i)
    ];
  }, u;
}
function ju(t, n, e, i, r, o) {
  if (e) {
    var u = F(n), a = L(n), s = i * e;
    r == null ? (r = n + i * U, o = n - s / 2) : (r = Ee(u, r), o = Ee(u, o), (i > 0 ? r < o : r > o) && (r += i * U));
    for (var l, f = r; i > 0 ? f > o : f < o; f -= s)
      l = Pn([u, -a * F(f), -a * L(f)]), t.point(l[0], l[1]);
  }
}
function Ee(t, n) {
  n = xt(n), n[0] -= t, bn(n);
  var e = Ju(-n[1]);
  return ((-n[2] < 0 ? -e : e) + U - T) % U;
}
function fi() {
  var t = [], n;
  return {
    point: function(e, i, r) {
      n.push([e, i, r]);
    },
    lineStart: function() {
      t.push(n = []);
    },
    lineEnd: G,
    rejoin: function() {
      t.length > 1 && t.push(t.pop().concat(t.shift()));
    },
    result: function() {
      var e = t;
      return t = [], n = null, e;
    }
  };
}
function jt(t, n) {
  return b(t[0] - n[0]) < T && b(t[1] - n[1]) < T;
}
function Zt(t, n, e, i) {
  this.x = t, this.z = n, this.o = e, this.e = i, this.v = !1, this.n = this.p = null;
}
function si(t, n, e, i, r) {
  var o = [], u = [], a, s;
  if (t.forEach(function(g) {
    if (!((_ = g.length - 1) <= 0)) {
      var _, v = g[0], E = g[_], w;
      if (jt(v, E)) {
        if (!v[2] && !E[2]) {
          for (r.lineStart(), a = 0; a < _; ++a)
            r.point((v = g[a])[0], v[1]);
          r.lineEnd();
          return;
        }
        E[0] += 2 * T;
      }
      o.push(w = new Zt(v, g, null, !0)), u.push(w.o = new Zt(v, null, w, !1)), o.push(w = new Zt(E, g, null, !1)), u.push(w.o = new Zt(E, null, w, !0));
    }
  }), !!o.length) {
    for (u.sort(n), Ne(o), Ne(u), a = 0, s = u.length; a < s; ++a)
      u[a].e = e = !e;
    for (var l = o[0], f, c; ; ) {
      for (var h = l, p = !0; h.v; )
        if ((h = h.n) === l)
          return;
      f = h.z, r.lineStart();
      do {
        if (h.v = h.o.v = !0, h.e) {
          if (p)
            for (a = 0, s = f.length; a < s; ++a)
              r.point((c = f[a])[0], c[1]);
          else
            i(h.x, h.n.x, 1, r);
          h = h.n;
        } else {
          if (p)
            for (f = h.p.z, a = f.length - 1; a >= 0; --a)
              r.point((c = f[a])[0], c[1]);
          else
            i(h.x, h.p.x, -1, r);
          h = h.p;
        }
        h = h.o, f = h.z, p = !p;
      } while (!h.v);
      r.lineEnd();
    }
  }
}
function Ne(t) {
  if (n = t.length) {
    for (var n, e = 0, i = t[0], r; ++e < n; )
      i.n = r = t[e], r.p = i, i = r;
    i.n = r = t[0], r.p = i;
  }
}
function mn(t) {
  return b(t[0]) <= A ? t[0] : Wu(t[0]) * ((b(t[0]) + A) % U - A);
}
function ta(t, n) {
  var e = mn(n), i = n[1], r = L(i), o = [L(e), -F(e), 0], u = 0, a = 0, s = new lt();
  r === 1 ? i = V + T : r === -1 && (i = -V - T);
  for (var l = 0, f = t.length; l < f; ++l)
    if (h = (c = t[l]).length)
      for (var c, h, p = c[h - 1], g = mn(p), _ = p[1] / 2 + ve, v = L(_), E = F(_), w = 0; w < h; ++w, g = y, v = N, E = C, p = x) {
        var x = c[w], y = mn(x), S = x[1] / 2 + ve, N = L(S), C = F(S), M = y - g, R = M >= 0 ? 1 : -1, P = R * M, m = P > A, H = v * N;
        if (s.add(Lt(H * R * L(P), E * C + H * F(P))), u += m ? M + R * U : M, m ^ g >= e ^ y >= e) {
          var I = fn(xt(p), xt(x));
          bn(I);
          var k = fn(o, I);
          bn(k);
          var d = (m ^ M >= 0 ? -1 : 1) * qt(k[2]);
          (i > d || i === d && (I[0] || I[1])) && (a += m ^ M >= 0 ? 1 : -1);
        }
      }
  return (u < -T || u < T && s < -Zu) ^ a & 1;
}
function li(t, n, e, i) {
  return function(r) {
    var o = n(r), u = fi(), a = n(u), s = !1, l, f, c, h = {
      point: p,
      lineStart: _,
      lineEnd: v,
      polygonStart: function() {
        h.point = E, h.lineStart = w, h.lineEnd = x, f = [], l = [];
      },
      polygonEnd: function() {
        h.point = p, h.lineStart = _, h.lineEnd = v, f = Fe(f);
        var y = ta(l, i);
        f.length ? (s || (r.polygonStart(), s = !0), si(f, ea, y, e, r)) : y && (s || (r.polygonStart(), s = !0), r.lineStart(), e(null, null, 1, r), r.lineEnd()), s && (r.polygonEnd(), s = !1), f = l = null;
      },
      sphere: function() {
        r.polygonStart(), r.lineStart(), e(null, null, 1, r), r.lineEnd(), r.polygonEnd();
      }
    };
    function p(y, S) {
      t(y, S) && r.point(y, S);
    }
    function g(y, S) {
      o.point(y, S);
    }
    function _() {
      h.point = g, o.lineStart();
    }
    function v() {
      h.point = p, o.lineEnd();
    }
    function E(y, S) {
      c.push([y, S]), a.point(y, S);
    }
    function w() {
      a.lineStart(), c = [];
    }
    function x() {
      E(c[0][0], c[0][1]), a.lineEnd();
      var y = a.clean(), S = u.result(), N, C = S.length, M, R, P;
      if (c.pop(), l.push(c), c = null, !!C) {
        if (y & 1) {
          if (R = S[0], (M = R.length - 1) > 0) {
            for (s || (r.polygonStart(), s = !0), r.lineStart(), N = 0; N < M; ++N)
              r.point((P = R[N])[0], P[1]);
            r.lineEnd();
          }
          return;
        }
        C > 1 && y & 2 && S.push(S.pop().concat(S.shift())), f.push(S.filter(na));
      }
    }
    return h;
  };
}
function na(t) {
  return t.length > 1;
}
function ea(t, n) {
  return ((t = t.x)[0] < 0 ? t[1] - V - T : V - t[1]) - ((n = n.x)[0] < 0 ? n[1] - V - T : V - n[1]);
}
const $e = li(
  function() {
    return !0;
  },
  ia,
  oa,
  [-A, -V]
);
function ia(t) {
  var n = NaN, e = NaN, i = NaN, r;
  return {
    lineStart: function() {
      t.lineStart(), r = 1;
    },
    point: function(o, u) {
      var a = o > 0 ? A : -A, s = b(o - n);
      b(s - A) < T ? (t.point(n, e = (e + u) / 2 > 0 ? V : -V), t.point(i, e), t.lineEnd(), t.lineStart(), t.point(a, e), t.point(o, e), r = 0) : i !== a && s >= A && (b(n - i) < T && (n -= i * T), b(o - a) < T && (o -= a * T), e = ra(n, e, o, u), t.point(i, e), t.lineEnd(), t.lineStart(), t.point(a, e), r = 0), t.point(n = o, e = u), i = a;
    },
    lineEnd: function() {
      t.lineEnd(), n = e = NaN;
    },
    clean: function() {
      return 2 - r;
    }
  };
}
function ra(t, n, e, i) {
  var r, o, u = L(t - e);
  return b(u) > T ? Ku((L(n) * (o = F(i)) * L(e) - L(i) * (r = F(n)) * L(t)) / (r * o * u)) : (n + i) / 2;
}
function oa(t, n, e, i) {
  var r;
  if (t == null)
    r = e * V, i.point(-A, r), i.point(0, r), i.point(A, r), i.point(A, 0), i.point(A, -r), i.point(0, -r), i.point(-A, -r), i.point(-A, 0), i.point(-A, r);
  else if (b(t[0] - n[0]) > T) {
    var o = t[0] < n[0] ? A : -A;
    r = e * o / 2, i.point(-o, r), i.point(0, r), i.point(o, r);
  } else
    i.point(n[0], n[1]);
}
function ua(t) {
  var n = F(t), e = 6 * O, i = n > 0, r = b(n) > T;
  function o(f, c, h, p) {
    ju(p, t, e, h, f, c);
  }
  function u(f, c) {
    return F(f) * F(c) > n;
  }
  function a(f) {
    var c, h, p, g, _;
    return {
      lineStart: function() {
        g = p = !1, _ = 1;
      },
      point: function(v, E) {
        var w = [v, E], x, y = u(v, E), S = i ? y ? 0 : l(v, E) : y ? l(v + (v < 0 ? A : -A), E) : 0;
        if (!c && (g = p = y) && f.lineStart(), y !== p && (x = s(c, w), (!x || jt(c, x) || jt(w, x)) && (w[2] = 1)), y !== p)
          _ = 0, y ? (f.lineStart(), x = s(w, c), f.point(x[0], x[1])) : (x = s(c, w), f.point(x[0], x[1], 2), f.lineEnd()), c = x;
        else if (r && c && i ^ y) {
          var N;
          !(S & h) && (N = s(w, c, !0)) && (_ = 0, i ? (f.lineStart(), f.point(N[0][0], N[0][1]), f.point(N[1][0], N[1][1]), f.lineEnd()) : (f.point(N[1][0], N[1][1]), f.lineEnd(), f.lineStart(), f.point(N[0][0], N[0][1], 3)));
        }
        y && (!c || !jt(c, w)) && f.point(w[0], w[1]), c = w, p = y, h = S;
      },
      lineEnd: function() {
        p && f.lineEnd(), c = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return _ | (g && p) << 1;
      }
    };
  }
  function s(f, c, h) {
    var p = xt(f), g = xt(c), _ = [1, 0, 0], v = fn(p, g), E = Gt(v, v), w = v[0], x = E - w * w;
    if (!x)
      return !h && f;
    var y = n * E / x, S = -n * w / x, N = fn(_, v), C = Ut(_, y), M = Ut(v, S);
    xn(C, M);
    var R = N, P = Gt(C, R), m = Gt(R, R), H = P * P - m * (Gt(C, C) - 1);
    if (!(H < 0)) {
      var I = pt(H), k = Ut(R, (-P - I) / m);
      if (xn(k, C), k = Pn(k), !h)
        return k;
      var d = f[0], $ = c[0], q = f[1], D = c[1], Y;
      $ < d && (Y = d, d = $, $ = Y);
      var St = $ - d, tt = b(St - A) < T, at = tt || St < T;
      if (!tt && D < q && (Y = q, q = D, D = Y), at ? tt ? q + D > 0 ^ k[1] < (b(k[0] - d) < T ? q : D) : q <= k[1] && k[1] <= D : St > A ^ (d <= k[0] && k[0] <= $)) {
        var nt = Ut(R, (-P + I) / m);
        return xn(nt, C), [k, Pn(nt)];
      }
    }
  }
  function l(f, c) {
    var h = i ? t : A - t, p = 0;
    return f < -h ? p |= 1 : f > h && (p |= 2), c < -h ? p |= 4 : c > h && (p |= 8), p;
  }
  return li(u, a, o, i ? [0, -t] : [-A, t - A]);
}
function aa(t, n, e, i, r, o) {
  var u = t[0], a = t[1], s = n[0], l = n[1], f = 0, c = 1, h = s - u, p = l - a, g;
  if (g = e - u, !(!h && g > 0)) {
    if (g /= h, h < 0) {
      if (g < f)
        return;
      g < c && (c = g);
    } else if (h > 0) {
      if (g > c)
        return;
      g > f && (f = g);
    }
    if (g = r - u, !(!h && g < 0)) {
      if (g /= h, h < 0) {
        if (g > c)
          return;
        g > f && (f = g);
      } else if (h > 0) {
        if (g < f)
          return;
        g < c && (c = g);
      }
      if (g = i - a, !(!p && g > 0)) {
        if (g /= p, p < 0) {
          if (g < f)
            return;
          g < c && (c = g);
        } else if (p > 0) {
          if (g > c)
            return;
          g > f && (f = g);
        }
        if (g = o - a, !(!p && g < 0)) {
          if (g /= p, p < 0) {
            if (g > c)
              return;
            g > f && (f = g);
          } else if (p > 0) {
            if (g < f)
              return;
            g < c && (c = g);
          }
          return f > 0 && (t[0] = u + f * h, t[1] = a + f * p), c < 1 && (n[0] = u + c * h, n[1] = a + c * p), !0;
        }
      }
    }
  }
}
var At = 1e9, Kt = -At;
function fa(t, n, e, i) {
  function r(l, f) {
    return t <= l && l <= e && n <= f && f <= i;
  }
  function o(l, f, c, h) {
    var p = 0, g = 0;
    if (l == null || (p = u(l, c)) !== (g = u(f, c)) || s(l, f) < 0 ^ c > 0)
      do
        h.point(p === 0 || p === 3 ? t : e, p > 1 ? i : n);
      while ((p = (p + c + 4) % 4) !== g);
    else
      h.point(f[0], f[1]);
  }
  function u(l, f) {
    return b(l[0] - t) < T ? f > 0 ? 0 : 3 : b(l[0] - e) < T ? f > 0 ? 2 : 1 : b(l[1] - n) < T ? f > 0 ? 1 : 0 : f > 0 ? 3 : 2;
  }
  function a(l, f) {
    return s(l.x, f.x);
  }
  function s(l, f) {
    var c = u(l, 1), h = u(f, 1);
    return c !== h ? c - h : c === 0 ? f[1] - l[1] : c === 1 ? l[0] - f[0] : c === 2 ? l[1] - f[1] : f[0] - l[0];
  }
  return function(l) {
    var f = l, c = fi(), h, p, g, _, v, E, w, x, y, S, N, C = {
      point: M,
      lineStart: H,
      lineEnd: I,
      polygonStart: P,
      polygonEnd: m
    };
    function M(d, $) {
      r(d, $) && f.point(d, $);
    }
    function R() {
      for (var d = 0, $ = 0, q = p.length; $ < q; ++$)
        for (var D = p[$], Y = 1, St = D.length, tt = D[0], at, nt, zt = tt[0], gt = tt[1]; Y < St; ++Y)
          at = zt, nt = gt, tt = D[Y], zt = tt[0], gt = tt[1], nt <= i ? gt > i && (zt - at) * (i - nt) > (gt - nt) * (t - at) && ++d : gt <= i && (zt - at) * (i - nt) < (gt - nt) * (t - at) && --d;
      return d;
    }
    function P() {
      f = c, h = [], p = [], N = !0;
    }
    function m() {
      var d = R(), $ = N && d, q = (h = Fe(h)).length;
      ($ || q) && (l.polygonStart(), $ && (l.lineStart(), o(null, null, 1, l), l.lineEnd()), q && si(h, a, d, o, l), l.polygonEnd()), f = l, h = p = g = null;
    }
    function H() {
      C.point = k, p && p.push(g = []), S = !0, y = !1, w = x = NaN;
    }
    function I() {
      h && (k(_, v), E && y && c.rejoin(), h.push(c.result())), C.point = M, y && f.lineEnd();
    }
    function k(d, $) {
      var q = r(d, $);
      if (p && g.push([d, $]), S)
        _ = d, v = $, E = q, S = !1, q && (f.lineStart(), f.point(d, $));
      else if (q && y)
        f.point(d, $);
      else {
        var D = [w = Math.max(Kt, Math.min(At, w)), x = Math.max(Kt, Math.min(At, x))], Y = [d = Math.max(Kt, Math.min(At, d)), $ = Math.max(Kt, Math.min(At, $))];
        aa(D, Y, t, n, e, i) ? (y || (f.lineStart(), f.point(D[0], D[1])), f.point(Y[0], Y[1]), q || f.lineEnd(), N = !1) : q && (f.lineStart(), f.point(d, $), N = !1);
      }
      w = d, x = $, y = q;
    }
    return C;
  };
}
const Ln = (t) => t;
var Sn = new lt(), qn = new lt(), ci, hi, Hn, Dn, rt = {
  point: G,
  lineStart: G,
  lineEnd: G,
  polygonStart: function() {
    rt.lineStart = sa, rt.lineEnd = ca;
  },
  polygonEnd: function() {
    rt.lineStart = rt.lineEnd = rt.point = G, Sn.add(b(qn)), qn = new lt();
  },
  result: function() {
    var t = Sn / 2;
    return Sn = new lt(), t;
  }
};
function sa() {
  rt.point = la;
}
function la(t, n) {
  rt.point = pi, ci = Hn = t, hi = Dn = n;
}
function pi(t, n) {
  qn.add(Dn * t - Hn * n), Hn = t, Dn = n;
}
function ca() {
  pi(ci, hi);
}
var mt = 1 / 0, sn = mt, Ht = -mt, ln = Ht, cn = {
  point: ha,
  lineStart: G,
  lineEnd: G,
  polygonStart: G,
  polygonEnd: G,
  result: function() {
    var t = [[mt, sn], [Ht, ln]];
    return Ht = ln = -(sn = mt = 1 / 0), t;
  }
};
function ha(t, n) {
  t < mt && (mt = t), t > Ht && (Ht = t), n < sn && (sn = n), n > ln && (ln = n);
}
var Xn = 0, On = 0, Mt = 0, hn = 0, pn = 0, vt = 0, zn = 0, Yn = 0, Rt = 0, gi, di, W, J, B = {
  point: ht,
  lineStart: Ae,
  lineEnd: Me,
  polygonStart: function() {
    B.lineStart = da, B.lineEnd = va;
  },
  polygonEnd: function() {
    B.point = ht, B.lineStart = Ae, B.lineEnd = Me;
  },
  result: function() {
    var t = Rt ? [zn / Rt, Yn / Rt] : vt ? [hn / vt, pn / vt] : Mt ? [Xn / Mt, On / Mt] : [NaN, NaN];
    return Xn = On = Mt = hn = pn = vt = zn = Yn = Rt = 0, t;
  }
};
function ht(t, n) {
  Xn += t, On += n, ++Mt;
}
function Ae() {
  B.point = pa;
}
function pa(t, n) {
  B.point = ga, ht(W = t, J = n);
}
function ga(t, n) {
  var e = t - W, i = n - J, r = pt(e * e + i * i);
  hn += r * (W + t) / 2, pn += r * (J + n) / 2, vt += r, ht(W = t, J = n);
}
function Me() {
  B.point = ht;
}
function da() {
  B.point = _a;
}
function va() {
  vi(gi, di);
}
function _a(t, n) {
  B.point = vi, ht(gi = W = t, di = J = n);
}
function vi(t, n) {
  var e = t - W, i = n - J, r = pt(e * e + i * i);
  hn += r * (W + t) / 2, pn += r * (J + n) / 2, vt += r, r = J * t - W * n, zn += r * (W + t), Yn += r * (J + n), Rt += r * 3, ht(W = t, J = n);
}
function _i(t) {
  this._context = t;
}
_i.prototype = {
  _radius: 4.5,
  pointRadius: function(t) {
    return this._radius = t, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    this._line === 0 && this._context.closePath(), this._point = NaN;
  },
  point: function(t, n) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(t, n), this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(t, n);
        break;
      }
      default: {
        this._context.moveTo(t + this._radius, n), this._context.arc(t, n, this._radius, 0, U);
        break;
      }
    }
  },
  result: G
};
var Bn = new lt(), En, yi, wi, Ct, kt, Dt = {
  point: G,
  lineStart: function() {
    Dt.point = ya;
  },
  lineEnd: function() {
    En && xi(yi, wi), Dt.point = G;
  },
  polygonStart: function() {
    En = !0;
  },
  polygonEnd: function() {
    En = null;
  },
  result: function() {
    var t = +Bn;
    return Bn = new lt(), t;
  }
};
function ya(t, n) {
  Dt.point = xi, yi = Ct = t, wi = kt = n;
}
function xi(t, n) {
  Ct -= t, kt -= n, Bn.add(pt(Ct * Ct + kt * kt)), Ct = t, kt = n;
}
let Re, gn, Ce, ke;
class Te {
  constructor(n) {
    this._append = n == null ? mi : wa(n), this._radius = 4.5, this._ = "";
  }
  pointRadius(n) {
    return this._radius = +n, this;
  }
  polygonStart() {
    this._line = 0;
  }
  polygonEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    this._line === 0 && (this._ += "Z"), this._point = NaN;
  }
  point(n, e) {
    switch (this._point) {
      case 0: {
        this._append`M${n},${e}`, this._point = 1;
        break;
      }
      case 1: {
        this._append`L${n},${e}`;
        break;
      }
      default: {
        if (this._append`M${n},${e}`, this._radius !== Ce || this._append !== gn) {
          const i = this._radius, r = this._;
          this._ = "", this._append`m0,${i}a${i},${i} 0 1,1 0,${-2 * i}a${i},${i} 0 1,1 0,${2 * i}z`, Ce = i, gn = this._append, ke = this._, this._ = r;
        }
        this._ += ke;
        break;
      }
    }
  }
  result() {
    const n = this._;
    return this._ = "", n.length ? n : null;
  }
}
function mi(t) {
  let n = 1;
  this._ += t[0];
  for (const e = t.length; n < e; ++n)
    this._ += arguments[n] + t[n];
}
function wa(t) {
  const n = Math.floor(t);
  if (!(n >= 0))
    throw new RangeError(`invalid digits: ${t}`);
  if (n > 15)
    return mi;
  if (n !== Re) {
    const e = 10 ** n;
    Re = n, gn = function(r) {
      let o = 1;
      this._ += r[0];
      for (const u = r.length; o < u; ++o)
        this._ += Math.round(arguments[o] * e) / e + r[o];
    };
  }
  return gn;
}
function xa(t, n) {
  let e = 3, i = 4.5, r, o;
  function u(a) {
    return a && (typeof i == "function" && o.pointRadius(+i.apply(this, arguments)), dt(a, r(o))), o.result();
  }
  return u.area = function(a) {
    return dt(a, r(rt)), rt.result();
  }, u.measure = function(a) {
    return dt(a, r(Dt)), Dt.result();
  }, u.bounds = function(a) {
    return dt(a, r(cn)), cn.result();
  }, u.centroid = function(a) {
    return dt(a, r(B)), B.result();
  }, u.projection = function(a) {
    return arguments.length ? (r = a == null ? (t = null, Ln) : (t = a).stream, u) : t;
  }, u.context = function(a) {
    return arguments.length ? (o = a == null ? (n = null, new Te(e)) : new _i(n = a), typeof i != "function" && o.pointRadius(i), u) : n;
  }, u.pointRadius = function(a) {
    return arguments.length ? (i = typeof a == "function" ? a : (o.pointRadius(+a), +a), u) : i;
  }, u.digits = function(a) {
    if (!arguments.length)
      return e;
    if (a == null)
      e = null;
    else {
      const s = Math.floor(a);
      if (!(s >= 0))
        throw new RangeError(`invalid digits: ${a}`);
      e = s;
    }
    return n === null && (o = new Te(e)), u;
  }, u.projection(t).digits(e).context(n);
}
function Qn(t) {
  return function(n) {
    var e = new Vn();
    for (var i in t)
      e[i] = t[i];
    return e.stream = n, e;
  };
}
function Vn() {
}
Vn.prototype = {
  constructor: Vn,
  point: function(t, n) {
    this.stream.point(t, n);
  },
  sphere: function() {
    this.stream.sphere();
  },
  lineStart: function() {
    this.stream.lineStart();
  },
  lineEnd: function() {
    this.stream.lineEnd();
  },
  polygonStart: function() {
    this.stream.polygonStart();
  },
  polygonEnd: function() {
    this.stream.polygonEnd();
  }
};
function jn(t, n, e) {
  var i = t.clipExtent && t.clipExtent();
  return t.scale(150).translate([0, 0]), i != null && t.clipExtent(null), dt(e, t.stream(cn)), n(cn.result()), i != null && t.clipExtent(i), t;
}
function Si(t, n, e) {
  return jn(t, function(i) {
    var r = n[1][0] - n[0][0], o = n[1][1] - n[0][1], u = Math.min(r / (i[1][0] - i[0][0]), o / (i[1][1] - i[0][1])), a = +n[0][0] + (r - u * (i[1][0] + i[0][0])) / 2, s = +n[0][1] + (o - u * (i[1][1] + i[0][1])) / 2;
    t.scale(150 * u).translate([a, s]);
  }, e);
}
function ma(t, n, e) {
  return Si(t, [[0, 0], n], e);
}
function Sa(t, n, e) {
  return jn(t, function(i) {
    var r = +n, o = r / (i[1][0] - i[0][0]), u = (r - o * (i[1][0] + i[0][0])) / 2, a = -o * i[0][1];
    t.scale(150 * o).translate([u, a]);
  }, e);
}
function Ea(t, n, e) {
  return jn(t, function(i) {
    var r = +n, o = r / (i[1][1] - i[0][1]), u = -o * i[0][0], a = (r - o * (i[1][1] + i[0][1])) / 2;
    t.scale(150 * o).translate([u, a]);
  }, e);
}
var Pe = 16, Na = F(30 * O);
function be(t, n) {
  return +n ? Aa(t, n) : $a(t);
}
function $a(t) {
  return Qn({
    point: function(n, e) {
      n = t(n, e), this.stream.point(n[0], n[1]);
    }
  });
}
function Aa(t, n) {
  function e(i, r, o, u, a, s, l, f, c, h, p, g, _, v) {
    var E = l - i, w = f - r, x = E * E + w * w;
    if (x > 4 * n && _--) {
      var y = u + h, S = a + p, N = s + g, C = pt(y * y + S * S + N * N), M = qt(N /= C), R = b(b(N) - 1) < T || b(o - c) < T ? (o + c) / 2 : Lt(S, y), P = t(R, M), m = P[0], H = P[1], I = m - i, k = H - r, d = w * I - E * k;
      (d * d / x > n || b((E * I + w * k) / x - 0.5) > 0.3 || u * h + a * p + s * g < Na) && (e(i, r, o, u, a, s, m, H, R, y /= C, S /= C, N, _, v), v.point(m, H), e(m, H, R, y, S, N, l, f, c, h, p, g, _, v));
    }
  }
  return function(i) {
    var r, o, u, a, s, l, f, c, h, p, g, _, v = {
      point: E,
      lineStart: w,
      lineEnd: y,
      polygonStart: function() {
        i.polygonStart(), v.lineStart = S;
      },
      polygonEnd: function() {
        i.polygonEnd(), v.lineStart = w;
      }
    };
    function E(M, R) {
      M = t(M, R), i.point(M[0], M[1]);
    }
    function w() {
      c = NaN, v.point = x, i.lineStart();
    }
    function x(M, R) {
      var P = xt([M, R]), m = t(M, R);
      e(c, h, f, p, g, _, c = m[0], h = m[1], f = M, p = P[0], g = P[1], _ = P[2], Pe, i), i.point(c, h);
    }
    function y() {
      v.point = E, i.lineEnd();
    }
    function S() {
      w(), v.point = N, v.lineEnd = C;
    }
    function N(M, R) {
      x(r = M, R), o = c, u = h, a = p, s = g, l = _, v.point = x;
    }
    function C() {
      e(c, h, f, p, g, _, o, u, r, a, s, l, Pe, i), v.lineEnd = y, y();
    }
    return v;
  };
}
var Ma = Qn({
  point: function(t, n) {
    this.stream.point(t * O, n * O);
  }
});
function Ra(t) {
  return Qn({
    point: function(n, e) {
      var i = t(n, e);
      return this.stream.point(i[0], i[1]);
    }
  });
}
function Ca(t, n, e, i, r) {
  function o(u, a) {
    return u *= i, a *= r, [n + t * u, e - t * a];
  }
  return o.invert = function(u, a) {
    return [(u - n) / t * i, (e - a) / t * r];
  }, o;
}
function Ie(t, n, e, i, r, o) {
  if (!o)
    return Ca(t, n, e, i, r);
  var u = F(o), a = L(o), s = u * t, l = a * t, f = u / t, c = a / t, h = (a * e - u * n) / t, p = (a * n + u * e) / t;
  function g(_, v) {
    return _ *= i, v *= r, [s * _ - l * v + n, e - l * _ - s * v];
  }
  return g.invert = function(_, v) {
    return [i * (f * _ - c * v + h), r * (p - c * _ - f * v)];
  }, g;
}
function ka(t) {
  return Ta(function() {
    return t;
  })();
}
function Ta(t) {
  var n, e = 150, i = 480, r = 250, o = 0, u = 0, a = 0, s = 0, l = 0, f, c = 0, h = 1, p = 1, g = null, _ = $e, v = null, E, w, x, y = Ln, S = 0.5, N, C, M, R, P;
  function m(d) {
    return M(d[0] * O, d[1] * O);
  }
  function H(d) {
    return d = M.invert(d[0], d[1]), d && [d[0] * it, d[1] * it];
  }
  m.stream = function(d) {
    return R && P === d ? R : R = Ma(Ra(f)(_(N(y(P = d)))));
  }, m.preclip = function(d) {
    return arguments.length ? (_ = d, g = void 0, k()) : _;
  }, m.postclip = function(d) {
    return arguments.length ? (y = d, v = E = w = x = null, k()) : y;
  }, m.clipAngle = function(d) {
    return arguments.length ? (_ = +d ? ua(g = d * O) : (g = null, $e), k()) : g * it;
  }, m.clipExtent = function(d) {
    return arguments.length ? (y = d == null ? (v = E = w = x = null, Ln) : fa(v = +d[0][0], E = +d[0][1], w = +d[1][0], x = +d[1][1]), k()) : v == null ? null : [[v, E], [w, x]];
  }, m.scale = function(d) {
    return arguments.length ? (e = +d, I()) : e;
  }, m.translate = function(d) {
    return arguments.length ? (i = +d[0], r = +d[1], I()) : [i, r];
  }, m.center = function(d) {
    return arguments.length ? (o = d[0] % 360 * O, u = d[1] % 360 * O, I()) : [o * it, u * it];
  }, m.rotate = function(d) {
    return arguments.length ? (a = d[0] % 360 * O, s = d[1] % 360 * O, l = d.length > 2 ? d[2] % 360 * O : 0, I()) : [a * it, s * it, l * it];
  }, m.angle = function(d) {
    return arguments.length ? (c = d % 360 * O, I()) : c * it;
  }, m.reflectX = function(d) {
    return arguments.length ? (h = d ? -1 : 1, I()) : h < 0;
  }, m.reflectY = function(d) {
    return arguments.length ? (p = d ? -1 : 1, I()) : p < 0;
  }, m.precision = function(d) {
    return arguments.length ? (N = be(C, S = d * d), k()) : pt(S);
  }, m.fitExtent = function(d, $) {
    return Si(m, d, $);
  }, m.fitSize = function(d, $) {
    return ma(m, d, $);
  }, m.fitWidth = function(d, $) {
    return Sa(m, d, $);
  }, m.fitHeight = function(d, $) {
    return Ea(m, d, $);
  };
  function I() {
    var d = Ie(e, 0, 0, h, p, c).apply(null, n(o, u)), $ = Ie(e, i - d[0], r - d[1], h, p, c);
    return f = Qu(a, s, l), C = In(n, $), M = In(f, C), N = be(C, S), k();
  }
  function k() {
    return R = P = null, m;
  }
  return function() {
    return n = t.apply(this, arguments), m.invert = n.invert && H, I();
  };
}
function Ei(t, n) {
  var e = n * n, i = e * e;
  return [
    t * (0.8707 - 0.131979 * e + i * (-0.013791 + i * (3971e-6 * e - 1529e-6 * i))),
    n * (1.007226 + e * (0.015085 + i * (-0.044475 + 0.028874 * e - 5916e-6 * i)))
  ];
}
Ei.invert = function(t, n) {
  var e = n, i = 25, r;
  do {
    var o = e * e, u = o * o;
    e -= r = (e * (1.007226 + o * (0.015085 + u * (-0.044475 + 0.028874 * o - 5916e-6 * u))) - n) / (1.007226 + o * (0.015085 * 3 + u * (-0.044475 * 7 + 0.028874 * 9 * o - 5916e-6 * 11 * u)));
  } while (b(r) > T && --i > 0);
  return [
    t / (0.8707 + (o = e * e) * (-0.131979 + o * (-0.013791 + o * o * o * (3971e-6 - 1529e-6 * o)))),
    e
  ];
};
function Pa() {
  return ka(Ei).scale(175.295);
}
function Tt(t, n, e) {
  this.k = t, this.x = n, this.y = e;
}
Tt.prototype = {
  constructor: Tt,
  scale: function(t) {
    return t === 1 ? this : new Tt(this.k * t, this.x, this.y);
  },
  translate: function(t, n) {
    return t === 0 & n === 0 ? this : new Tt(this.k, this.x + this.k * t, this.y + this.k * n);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
Tt.prototype;
const ba = ["width", "height"], Fa = /* @__PURE__ */ Ni({
  __name: "Geography",
  props: {
    geography: {
      // topojson file
      type: String,
      required: !0
    },
    width: {
      type: [String, Number],
      required: !0
    },
    height: {
      type: [String, Number],
      required: !0
    },
    scale: {
      type: [String, Number],
      default: 1.5
    },
    filter: {
      type: String
    },
    fill: {
      type: String,
      default: "white"
    },
    stroke: {
      type: String,
      default: "black"
    }
  },
  setup(t) {
    const n = t;
    return $i(() => {
      const e = lo("svg"), i = +e.attr("width"), r = +e.attr("height"), o = Pa().center([12, 0]).scale(i / +n.scale / Math.PI).translate([i / 2, r / 2]);
      Uu(n.geography).then(function(u) {
        n.filter && (u.features = u.features.filter((s) => (console.log(typeof s), s.properties.name == n.filter)));
        const a = xa().projection(o);
        e.append("g").selectAll("path").data(u.features).join("path").attr("fill", n.fill).attr("d", (s) => a(s)).style("stroke", n.stroke);
      });
    }), (e, i) => (Ai(), Mi("svg", {
      id: "map",
      width: t.width,
      height: t.height
    }, null, 8, ba));
  }
});
export {
  Fa as Geography
};
