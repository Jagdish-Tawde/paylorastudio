import {describe,it,expect} from 'vitest';
import {calculateQuote,formatQuote} from './quote';
import {whatsappUrl} from './whatsapp';
import {packages,addons} from '../config/pricing';
import {customerSchema} from './validation';
describe('quotation calculations',()=>{
 for(const p of packages)it(`calculates ${p.name} and optional maintenance`,()=>{const base={packageId:p.id,pages:0,addonIds:[],maintenance:false};expect(calculateQuote(base).total).toBe(p.price);expect(calculateQuote({...base,maintenance:true}).total).toBe(p.price+p.annual)});
 it('adds pages and unique extras without charging included gallery or SEO',()=>{expect(calculateQuote({packageId:'business',pages:2,addonIds:['gallery','gallery','seo'],maintenance:true})).toMatchObject({oneTime:15499,annual:2999,total:18498});expect(calculateQuote({packageId:'business',pages:0,addonIds:[],maintenance:false}).oneTime).toBe(7999)});
 it('handles all extras and clamps pages',()=>{expect(calculateQuote({packageId:'starter',pages:-4,addonIds:addons.map(a=>a.id),maintenance:false}).oneTime).toBe(9499);expect(calculateQuote({packageId:'starter',pages:999,addonIds:[],maintenance:false}).pages).toBe(50)});
 it('formats complete enquiry details',()=>{const s=formatQuote({packageId:'business',pages:1,addonIds:['gallery'],maintenance:true},{name:'Test Name',email:'test@example.com',phone:'9876543210',business:'Bakery',category:'Food',requirements:'A seasonal menu'});for(const item of ['Test Name','Business Connect','Extra image gallery','₹10,499','₹2,999','₹13,498','Food','A seasonal menu'])expect(s).toContain(item)});
});
describe('WhatsApp links',()=>{it('encodes message safely',()=>{const message='Hello! ₹9,999 & a\nnew website?';expect(whatsappUrl(message,'919876543210')).toBe('https://wa.me/919876543210?text='+encodeURIComponent(message))});it('refuses empty and invalid numbers',()=>{expect(whatsappUrl('test','')).toBeNull();expect(whatsappUrl('test','fake-number')).toBeNull()})});
it('validates customer contact details',()=>{expect(customerSchema.safeParse({name:'A',email:'bad',phone:'12',business:'',category:'',requirements:''}).success).toBe(false)});
