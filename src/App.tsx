/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Droplets, 
  MapPin, 
  Menu, 
  Phone, 
  ShieldCheck, 
  Star, 
  Zap,
  ArrowRight,
  Instagram,
  Facebook,
  Clock,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Send,
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  Mail,
  Link2,
  Twitter
} from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [sharing, setSharing] = useState<{ isOpen: boolean; product: any | null }>({
    isOpen: false,
    product: null
  });
  const [gallery, setGallery] = useState<{ isOpen: boolean; productIndex: number; imageIndex: number }>({
    isOpen: false,
    productIndex: 0,
    imageIndex: 0
  });

  const PRODUCTS = [
    {
      title: "Refil IBBL C+3 Natural",
      brand: "IBBL",
      desc: "O mais procurado. Retenção de partículas e cloro para linha IBBL.",
      buyLink: "https://loja.infinitepay.io/dfiltrosecasa/tfg9624-refil-c-3-naturalis",
      images: [
        "https://lh3.googleusercontent.com/d/1VVn4CP0dMM7oqSRQv0YqNkPLrNDcDsxu",
        "https://images.unsplash.com/photo-1585837500582-4912f256675d?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      title: "Refil IBBL CZ+7 Protection",
      brand: "IBBL",
      desc: "Proteção máxima com ação bacteriológica e eliminação de vírus.",
      images: [
        "https://lh3.googleusercontent.com/d/1io87EoLPyivp_sCY38LlWY-S-zOVKM-4",
        "https://images.unsplash.com/photo-1622322062681-309e7f8bf534?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      title: "Refil WFS Filters",
      brand: "WFS",
      desc: "Compatível com multimarcas. A solução versátil para purificação.",
      images: [
        "https://lh3.googleusercontent.com/d/1Y-bU09Rl8OeKMhy7ZZu0UC71mKUbShcb",
        "https://images.unsplash.com/photo-1540324155974-7523202daa3f?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1552824730-47e9cede0703?auto=format&fit=crop&q=80&w=800"
      ]
    },
    {
      title: "Purificadores de água",
      brand: "Linha Top Life",
      desc: "Linha completa de purificadores com tecnologia de ponta para sua casa ou empresa.",
      images: [
        "https://lh3.googleusercontent.com/d/1aEGFnczq3LSBBvMvLghEdfiPt0jLV7-X",
        "https://lh3.googleusercontent.com/d/1Ma-i1q0tvvxU3UHjGIgefe3v4YMVQG9N",
        "https://lh3.googleusercontent.com/d/1oydKvKcqGRKG8I_ct0bJrT2IfPoV7kDf",
        "https://lh3.googleusercontent.com/d/1yVSSXVDu4cYdWc7hEPcV6ak2zAYjF2aS"
      ]
    }
  ];

  const openGallery = (productIndex: number) => {
    setGallery({ isOpen: true, productIndex, imageIndex: 0 });
  };

  const closeGallery = () => {
    setGallery(prev => ({ ...prev, isOpen: false }));
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const currentProduct = PRODUCTS[gallery.productIndex];
    setGallery(prev => ({
      ...prev,
      imageIndex: (prev.imageIndex + 1) % currentProduct.images.length
    }));
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const currentProduct = PRODUCTS[gallery.productIndex];
    setGallery(prev => ({
      ...prev,
      imageIndex: (prev.imageIndex - 1 + currentProduct.images.length) % currentProduct.images.length
    }));
  };

  // Prevent body scroll when gallery is open
  useEffect(() => {
    if (gallery.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [gallery.isOpen]);

  const openShare = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    setSharing({ isOpen: true, product });
  };

  const closeShare = () => {
    setSharing(prev => ({ ...prev, isOpen: false }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Link copiado para a área de transferência!");
  };

  const BRANDS = ["IBBL", "Colormaq", "Latina", "WFS", "Consul", "Electrolux", "Lorenzetti", "Outra"];
  const MODELS: Record<string, string[]> = {
    "IBBL": ["C+3 Natural", "CZ+7 Protection", "Avanti / Mio", "Vivá", "FR600 / Atlantis", "Immaginare"],
    "Colormaq": ["Premium", "Acqua", "Modelos Antigos"],
    "Latina": ["PA735", "PA335", "PA355", "PN535 / Vitaminic", "Puritronic"],
    "WFS": ["Refil Externo 5'", "Refil Externo 10'", "Compatíveis WFS"],
    "Consul": ["CPB34", "CPB35 / CPB36", "Cix01 / Cix06"],
    "Electrolux": ["PE11B / PE11X", "PA21G / PA26G", "PA31G"],
    "Lorenzetti": ["Gioviale", "Acqua Bella", "Vitale"],
    "Outra": ["Não listado"]
  };

  const WHATSAPP_LINK = "https://wa.me/5527999012401?text=Olá!%20Gostaria%20de%20pedir%20um%20refil.";
  const PAGSEGURO_LINK = "https://pagseguro.uol.com.br/"; // FAVOR SUBSTITUIR PELO SEU LINK REAL

  const handleCatalogInquiry = () => {
    const text = `Olá! Tenho um purificador da marca *${selectedBrand}* modelo *${selectedModel}* e gostaria de verificar a disponibilidade do refil.`;
    window.open(`https://wa.me/5527999012401?text=${encodeURIComponent(text)}`, "_blank");
  };

  const validatePhone = (value: string) => {
    // Regex for Brazilian phone: (XX) 9XXXX-XXXX or (XX) XXXX-XXXX
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!value) {
      setPhoneError("Telefone é obrigatório");
      return false;
    }
    if (!phoneRegex.test(value)) {
      setPhoneError("Formato inválido. Use (27) 99999-9999");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const maskPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = maskPhone(e.target.value);
    setPhone(maskedValue);
    validatePhone(maskedValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePhone(phone) && formData.name) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setPhone("");
        setFormData({ name: "", message: "" });
        setTimeout(() => setIsSuccess(false), 5000);
      }, 1500);
    }
  };

  useGSAP(() => {
    // Hero Entrance
    const tl = gsap.timeline();
    tl.from(".hero-title", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.2
    })
    .from(".hero-sub", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8")
    .from(".hero-cta", {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.6");

    // Scroll Revelations
    const revealSections = document.querySelectorAll(".reveal-section");
    revealSections.forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });

    // Marquee Animation
    gsap.to(".marquee-inner", {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: "none"
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen selection:bg-blue-500/30 selection:text-white">
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between glass rounded-3xl px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
              <Droplets className="text-white w-6 h-6" />
            </div>
            <span className="font-display text-2xl tracking-tighter hover:text-blue-400 transition-colors cursor-pointer uppercase">
              DFILTROS
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {["Produtos", "Especialista", "Depoimentos", "Localização", "Orçamento"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-500 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-green-500/20"
            >
              Quero Refil
            </a>
            <a 
              href="https://wa.me/5527999012401?text=Ólá,%20Gostaria%20de%20tirar%20uma%20dúvida."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20"
            >
              FALAR COM ATENDENTE
            </a>
          </div>

          <button className="lg:hidden p-2 glass rounded-xl">
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1552824730-47e9cede0703?auto=format&fit=crop&q=80&w=2000" 
            alt="Fundo Luxo"
            className="w-full h-full object-cover opacity-30 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-transparent to-brand-bg opacity-90" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-balance">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-pulse text-xs font-semibold tracking-widest text-blue-400 uppercase">
            <MapPin className="w-4 h-4" />
            Viana - Espírito Santo
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 font-medium mb-8 italic">
            "Você realmente confia na água que sua família está bebendo todos os dias?"
          </p>
          
          <h1 className="hero-title font-display text-5xl md:text-8xl leading-[1.1] md:leading-[1.05] tracking-tight mb-8">
            <span className="text-gradient uppercase">Dfiltros</span> <br />
            Água Pura e Saudável.
          </h1>
          
          <p className="hero-sub text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Especialista em filtros e purificadores em Viana e região. Atendimento ágil em Marcílio de Noronha com os melhores refis das marcas IBBL, Colormaq e WFS.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={WHATSAPP_LINK} 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-5 bg-green-600 text-white rounded-full font-bold text-lg hover:bg-green-500 hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3 group border border-green-400/20"
            >
              Quero Refil
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a 
              href="https://wa.me/5527999012401?text=Ólá,%20Gostaria%20de%20tirar%20uma%20dúvida."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-5 glass rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-5 h-5 text-blue-400" />
              FALAR COM ATENDENTE
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent" />
        </div>
      </section>

      {/* AUTHORITY MARQUEE */}
      <section className="py-12 border-y border-white/5 bg-white/2 overflow-hidden">
        <div className="marquee-wrapper relative flex">
          <div className="marquee-inner flex whitespace-nowrap gap-12 sm:gap-24 items-center">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-12 sm:gap-24 items-center">
                <span className="text-2xl sm:text-4xl font-display text-white/20 hover:text-white/40 transition-colors uppercase italic tracking-tighter">LATINA</span>
                <span className="text-2xl sm:text-4xl font-display text-white/20 hover:text-white/40 transition-colors uppercase italic tracking-tighter">IBBL</span>
                <span className="text-2xl sm:text-4xl font-display text-white/20 hover:text-white/40 transition-colors uppercase italic tracking-tighter">COLORMAQ</span>
                <span className="text-2xl sm:text-4xl font-display text-white/20 hover:text-white/40 transition-colors uppercase italic tracking-tighter">WFS</span>
                <span className="text-2xl sm:text-4xl font-display text-white/20 hover:text-white/40 transition-colors uppercase italic tracking-tighter text-blue-500/30">ESPECIALISTA</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO GRID DIFFERENTIATS */}
      <section id="especialista" className="py-24 px-6 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal-section">
            <h2 className="font-display text-4xl md:text-6xl mb-6">Excelência em Filtros</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-light">Especialistas em manter a sua água livre de impurezas. Mais de 15 anos de mercado garantindo saúde e qualidade para sua família.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
            {/* Bento Item 1 */}
            <div className="md:col-span-8 glass p-10 rounded-[2.5rem] relative overflow-hidden group reveal-section">
              <div className="relative z-10 h-full flex flex-col justify-end">
                <ShieldCheck className="w-12 h-12 text-blue-500 mb-6" />
                <h3 className="text-3xl font-display mb-4">Troca do Refil: Essencial</h3>
                <p className="text-gray-400 max-w-md italic font-light">A substituição a cada 6 meses garante a segurança necessária. Evite o acúmulo de microrganismos prejudiciais.</p>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=1000" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-1000" 
                alt="Agua Pura"
              />
            </div>

            {/* Bento Item 2 */}
            <div className="md:col-span-4 bg-blue-600 p-10 rounded-[2.5rem] flex flex-col justify-between reveal-section group hover:bg-blue-500 transition-colors duration-500">
              <Clock className="w-12 h-12 text-white" />
              <div>
                <h3 className="text-3xl font-display mb-2">Rapidez</h3>
                <p className="text-blue-100 text-sm font-light">Atendimento técnico especializado em Viana com agilidade e compromisso total.</p>
              </div>
            </div>

            {/* Bento Item 3 */}
            <div className="md:col-span-4 glass p-10 rounded-[2.5rem] flex flex-col justify-between reveal-section group hover:bg-white/10 transition-colors">
              <Zap className="w-12 h-12 text-blue-500" />
              <div>
                <h3 className="text-2xl font-display mb-2">Purificadores Latina</h3>
                <p className="text-gray-400 text-sm font-light">Vendas, trocas de refil , higienização e acessórios.</p>
              </div>
            </div>

            {/* Bento Item 4 */}
            <div className="md:col-span-8 glass p-10 rounded-[2.5rem] relative overflow-hidden group reveal-section">
              <div className="relative z-10 h-full flex flex-col justify-end">
                <MapPin className="w-12 h-12 text-blue-500 mb-6" />
                <h3 className="text-3xl font-display mb-4">Loja Dfiltros</h3>
                <p className="text-gray-400 max-w-sm font-light">Localizada em Marcílio de Noronha, Viana - ES. Um ponto fixo de confiança há mais de 15 anos.</p>
              </div>
              <div className="absolute top-10 right-10 flex flex-col items-end gap-1">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-blue-500 text-blue-500" />)}
                </div>
                <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">5,0 no Google</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="py-24 px-6 relative overflow-hidden bg-white/[0.01]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 aspect-square rounded-[3rem] overflow-hidden glass reveal-section group ring-1 ring-white/10 shadow-2xl">
            <img
              src="https://lh3.googleusercontent.com/d/1eqwj5kkqI_2Bexr9UmMl6PIvk4mb91NB"
              alt="Edmilson Alves - Proprietário Dfiltros"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="w-full md:w-1/2 reveal-section">
            <div className="inline-block px-4 py-1 bg-blue-600/10 text-blue-500 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-blue-500/20">
              Proprietário & Fundador
            </div>
            <h2 className="font-display text-4xl md:text-7xl mb-8 leading-none tracking-tight">Edmilson <br /> <span className="text-blue-500">Alves</span></h2>
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-8 italic">
              "Proprietário das lojas Dfiltros, desde 2011, com satisfação e carinho aos clientes e amigos."
            </p>
            
            <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5">
              <div>
                <div className="text-4xl font-display text-white mb-1">2011</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Fundado em Viana</div>
              </div>
              <div>
                <div className="text-4xl font-display text-white mb-1 text-blue-500">Dedicação</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Aos clientes e amigos</div>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <div className="w-12 h-px bg-blue-600" />
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 font-mono">Expert em Purificadores</span>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="produtos" className="py-24 bg-white/[0.02] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-section mb-16">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
              <div className="max-w-xl">
                <h2 className="font-display text-4xl md:text-5xl mb-4">Encontre seu Refil</h2>
                <p className="text-gray-400 font-light mb-8">Selecione a marca e modelo do seu purificador para consultar o refil ideal e garantir a pureza da sua água.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-blue-500 ml-1">Marca do Purificador</label>
                    <select 
                      value={selectedBrand}
                      onChange={(e) => {
                        setSelectedBrand(e.target.value);
                        setSelectedModel("");
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors text-sm appearance-none cursor-pointer hover:bg-white/10"
                    >
                      <option value="" className="bg-brand-bg">Selecione a Marca</option>
                      {BRANDS.map(brand => (
                        <option key={brand} value={brand} className="bg-brand-bg">{brand}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-blue-500 ml-1">Modelo (Opcional)</label>
                    <select 
                      disabled={!selectedBrand}
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors text-sm appearance-none cursor-pointer hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <option value="" className="bg-brand-bg">Selecione o Modelo</option>
                      {selectedBrand && MODELS[selectedBrand]?.map(model => (
                        <option key={model} value={model} className="bg-brand-bg">{model}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button 
                  onClick={handleCatalogInquiry}
                  disabled={!selectedBrand}
                  className="mt-6 w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20 disabled:opacity-30 disabled:hover:scale-100 flex items-center justify-center gap-3 group"
                >
                  Consultar no Whats
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="hidden lg:block w-px h-64 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

              <div className="lg:max-w-xs text-right">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] uppercase font-bold tracking-widest mb-4">
                  <Droplets className="w-3 h-3" />
                  Pronta Entrega
                </div>
                <h3 className="font-display text-2xl mb-4 italic">Refis originais e compatíveis</h3>
                <p className="text-gray-500 text-xs leading-relaxed">Atendemos Viana, Cariacica e região com o maior estoque técnico de filtros do ES.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product, i) => (
              <div 
                key={i} 
                onClick={() => openGallery(i)}
                className="group glass p-4 rounded-[2rem] hover:bg-white/10 transition-all cursor-pointer reveal-section flex flex-col h-full"
              >
                <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-6 relative bg-white/5">
                  <img 
                    src={product.images[0]} 
                    alt={product.title} 
                    className={`w-full h-full transition-transform duration-700 group-hover:scale-110 ${
                      product.title === "Purificadores de água" ? "object-contain p-8" : "object-cover"
                    }`} 
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                     <span className="px-3 py-1 bg-blue-600/90 backdrop-blur text-[10px] uppercase font-bold rounded-full">{product.brand}</span>
                  </div>
                  <button 
                    onClick={(e) => openShare(e, product)}
                    className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur rounded-full hover:bg-black/60 transition-colors z-10"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur px-2 py-1 rounded-lg text-[8px] uppercase tracking-tighter font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver Galeria ({product.images.length})
                  </div>
                </div>
                <div className="px-2 pb-2 flex-grow flex flex-col">
                  <h3 className="text-xl font-display mb-2">{product.title}</h3>
                  <p className="text-xs text-gray-500 mb-6 font-light leading-relaxed flex-grow">{product.desc}</p>
                  <div className={`grid ${product.buyLink ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(WHATSAPP_LINK, "_blank");
                      }}
                      className="py-3 px-2 text-center rounded-xl bg-green-600/10 border border-green-600/20 hover:bg-green-600 hover:border-green-600 transition-all font-bold text-[8px] tracking-widest uppercase text-green-500 hover:text-white"
                    >
                      {product.title === "Purificadores de água" ? "Saiba Mais" : "WhatsApp"}
                    </button>
                    {product.buyLink && (
                      <a 
                        href={product.buyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="py-3 px-2 text-center rounded-xl bg-blue-600 border border-blue-600 hover:bg-blue-500 transition-all font-bold text-[8px] tracking-widest uppercase text-white shadow-lg shadow-blue-600/20"
                      >
                        Comprar Agora
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="depoimentos" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal-section">
            <h2 className="font-display text-4xl md:text-5xl mb-6">O Que Dizem Nossos Clientes</h2>
            <div className="flex justify-center gap-1 mb-4">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-blue-500 text-blue-500" />)}
            </div>
            <p className="text-gray-400 font-light max-w-xl mx-auto leading-relaxed">Depoimentos reais coletados em nossa página de avaliações no Google Maps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Elyan Alves", role: "Cliente Google", comment: "Atendimento excelente, com preços ótimos e qualidade dos produtos ótima" },
              { name: "Maria Sonia", role: "Avaliação Google", comment: "Recepção notável, melhor preço , ótimo atendimento." },
              { name: "Luis Carlos Simões", role: "Avaliação Google", comment: "Atendimento ótimo produto muito bom" }
            ].map((t, i) => (
              <div key={i} className="glass p-10 rounded-[2.5rem] relative reveal-section group hover:border-blue-500/30 transition-all">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-serif text-white italic group-hover:scale-110 transition-transform">"</div>
                <p className="text-lg italic text-gray-300 mb-8 font-light leading-relaxed">
                  {t.comment}
                </p>
                <div>
                  <h4 className="font-display text-xl">{t.name}</h4>
                  <p className="text-sm text-blue-400 font-semibold tracking-wider uppercase text-[10px]">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section id="localização" className="py-24 px-6 bg-blue-600/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="reveal-section">
            <h2 className="font-display text-4xl md:text-6xl mb-8">Nossa Localização</h2>
            <div className="space-y-8">
              <div className="flex gap-4 group">
                <div className="p-4 glass rounded-2xl group-hover:bg-blue-600 transition-colors">
                  <MapPin className="w-6 h-6 text-blue-500 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-display text-xl mb-1 uppercase tracking-tight">Endereço Principal</h4>
                  <p className="text-gray-400 font-light">Av. Espírito Santo, 20 - quadra 11 <br /> Marcílio de Noronha, Viana - ES, 29135-508</p>
                </div>
              </div>
              <div className="flex gap-4 group">
                <div className="p-4 glass rounded-2xl group-hover:bg-blue-600 transition-colors">
                  <Phone className="w-6 h-6 text-blue-500 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-display text-xl mb-1 uppercase tracking-tight">Fale Conosco</h4>
                  <p className="text-gray-400 font-light">(27) 99901-2401</p>
                </div>
              </div>
              <div className="flex gap-4 group">
                <div className="p-4 glass rounded-2xl group-hover:bg-blue-600 transition-colors">
                  <Clock className="w-6 h-6 text-blue-500 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-display text-xl mb-1 uppercase tracking-tight">Funcionamento</h4>
                  <p className="text-gray-400 text-sm font-light uppercase tracking-widest">Segunda a Sexta: 09h às 18h <br />Sábados: 09h às 13h</p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[450px] glass rounded-[3rem] relative overflow-hidden reveal-section group shadow-2xl">
             <img 
               src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000" 
               className="w-full h-full object-cover opacity-40 grayscale group-hover:opacity-60 group-hover:grayscale-0 transition-all duration-1000" 
               alt="Dfiltros Viana ES"
             />
             <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
               <div className="bg-black/50 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                 <h3 className="font-display text-2xl mb-4">Visite nossa Loja</h3>
                 <p className="text-sm text-gray-500 mb-8 font-light">Para um atendimento presencial ou retirada técnica de produtos.</p>
                 <a 
                   href="https://www.google.com/maps/dir//Dfiltros+Filtros+e+Purificadores+de+%C3%81gua+em+Viana+e+Cariacica+ES+-+Av.+Esp%C3%ADrito+Santo,+20+-+quadra+11+-+Marc%C3%ADlio+de+Noronha,+Viana+-+ES,+29135-508/@-20.3854117,-40.4357731,17z"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-block px-10 py-4 bg-blue-600 text-white font-bold rounded-full shadow-xl hover:scale-105 transition-all uppercase tracking-widest text-xs"
                 >
                   Ver no Mapa
                 </a>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section id="orçamento" className="py-24 px-6 reveal-section">
        <div className="max-w-4xl mx-auto">
          <div className="glass p-8 md:p-12 rounded-[3rem] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <MessageCircle className="w-32 h-32 text-blue-500" />
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="font-display text-3xl md:text-5xl mb-6 leading-tight">Solicite seu <br /> <span className="text-blue-500">Orçamento</span></h2>
                <p className="text-gray-400 font-light mb-8 italic">
                  Está na dúvida de qual refil comprar ou precisa de uma limpeza técnica? Preencha os dados e retornamos em minutos.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    Resposta em breve
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    Atendimento via WhatsApp ou Ligação
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1">Seu Nome</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Como podemos te chamar?"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1">Seu Telefone (WhatsApp)</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="(27) 99999-9999"
                      className={`w-full bg-white/5 border ${phoneError ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-colors text-sm`}
                    />
                    {phoneError && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 flex items-center gap-1 text-[10px] font-bold">
                        <AlertCircle className="w-3 h-3" />
                        {phoneError}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2 ml-1">Mensagem (Opcional)</label>
                  <textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Qual refil você precisa?"
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-colors text-sm resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting || !!phoneError}
                  className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all ${isSuccess ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98]'} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Enviado com Sucesso!
                    </>
                  ) : (
                    <>
                      Solicitar Agora
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/5 bg-white/[0.01] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <Droplets className="text-white w-5 h-5" />
                </div>
                <span className="font-display text-xl tracking-tighter uppercase">DFILTROS</span>
              </div>
              <p className="text-gray-400 max-w-sm font-light leading-relaxed">
                Referência em Viana ES no segmento de purificação de água. Compromisso com a qualidade e atendimento técnico de excelência.
              </p>
              <div className="flex gap-4 mt-8">
                <a href="https://www.instagram.com/dfiltros/" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-xl hover:bg-blue-600 hover:border-blue-600 transition-all transform hover:-translate-y-1">
                  <Instagram className="w-5 h-5 font-bold" />
                </a>
                <a href="#" className="p-3 glass rounded-xl hover:bg-white/10 transition-all transform hover:-translate-y-1">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="font-display text-lg mb-6 uppercase tracking-widest text-gray-400">Atalhos</h5>
              <ul className="space-y-4 text-xs font-medium uppercase tracking-widest">
                <li><a href="#produtos" className="hover:text-blue-400 transition-colors">Produtos</a></li>
                <li><a href="#especialista" className="hover:text-blue-400 transition-colors">Especialista</a></li>
                <li><a href="#depoimentos" className="hover:text-blue-400 transition-colors">Depoimentos</a></li>
                <li><a href={WHATSAPP_LINK} className="text-blue-500 font-bold">WhatsApp</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-display text-lg mb-6 uppercase tracking-widest text-gray-400">Viana ES</h5>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                Av. Espírito Santo, 20 <br />
                Marcílio de Noronha <br />
                Viana - ES <br />
                <span className="text-white font-medium">(27) 99901-2401</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-600">
            <p>© 2026 Dfiltros - Filtros e Purificadores. Viana, Espírito Santo.</p>
            <div className="flex gap-8">
              <span className="text-blue-500/30">Pura Água, Pura Vida</span>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING CTA MOBILE */}
      <div className="fixed bottom-8 right-8 z-50 md:hidden">
        <a 
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50 hover:scale-110 active:scale-95 transition-all text-white animate-bounce"
        >
          <MessageCircle className="w-8 h-8" />
        </a>
      </div>

      {/* GALLERY MODAL */}
      <AnimatePresence>
        {gallery.isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
            onClick={closeGallery}
          >
            <div className="absolute inset-0 bg-brand-bg/95 backdrop-blur-xl" />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative z-10 w-full max-w-5xl aspect-[4/3] md:aspect-video rounded-[3rem] overflow-hidden glass ring-1 ring-white/10 shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Area */}
              <div className="relative flex-grow bg-black/20 group">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={gallery.imageIndex}
                    src={PRODUCTS[gallery.productIndex].images[gallery.imageIndex]}
                    alt="Produto"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="w-full h-full object-contain"
                  />
                </AnimatePresence>

                {/* Controls */}
                <button 
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Counter */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 glass rounded-full text-[10px] uppercase font-bold tracking-widest">
                  {gallery.imageIndex + 1} / {PRODUCTS[gallery.productIndex].images.length}
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="w-full md:w-80 p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10">
                <div>
                  <div className="text-blue-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-2">
                    {PRODUCTS[gallery.productIndex].brand}
                  </div>
                  <h3 className="text-3xl font-display mb-4 leading-tight">{PRODUCTS[gallery.productIndex].title}</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed mb-8 italic">
                    {PRODUCTS[gallery.productIndex].desc}
                  </p>
                </div>

                <div className="space-y-4">
                  {PRODUCTS[gallery.productIndex].buyLink && (
                    <a 
                      href={PRODUCTS[gallery.productIndex].buyLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-blue-600/20"
                    >
                      Comprar Agora
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                  <a 
                    href={WHATSAPP_LINK} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-green-600 hover:bg-green-500 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-green-600/20"
                  >
                    {PRODUCTS[gallery.productIndex].title === "Purificadores de água" ? "Saiba Mais" : "Consultar via WhatsApp"}
                    <Droplets className="w-4 h-4" />
                  </a>
                  <button 
                    onClick={closeGallery}
                    className="w-full py-4 glass hover:bg-white/5 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all"
                  >
                    Fechar Galeria
                  </button>
                </div>
              </div>

              {/* Close Button Mobile Header */}
              <button 
                onClick={closeGallery}
                className="absolute top-6 right-6 p-2 rounded-full glass md:hidden"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* SHARE MODAL */}
      <AnimatePresence>
        {sharing.isOpen && sharing.product && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-6"
            onClick={closeShare}
          >
            <div className="absolute inset-0 bg-brand-bg/80 backdrop-blur-md" />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative z-10 w-full max-w-sm glass rounded-[2.5rem] p-8 ring-1 ring-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-display text-2xl">Compartilhar</h3>
                <button onClick={closeShare} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-8 p-4 bg-white/5 rounded-2xl border border-white/5">
                <img src={sharing.product.images[0]} alt="" className="w-16 h-16 object-cover rounded-xl" />
                <div>
                  <h4 className="font-bold text-sm leading-tight mb-1">{sharing.product.title}</h4>
                  <p className="text-[10px] text-blue-500 uppercase font-bold tracking-widest">{sharing.product.brand}</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-8">
                {[
                  { 
                    icon: <MessageCircle className="w-6 h-6" />, 
                    label: "WhatsApp", 
                    color: "bg-green-600",
                    action: () => window.open(`https://wa.me/?text=${encodeURIComponent(`Confira o ${sharing.product.title} na Dfiltros! ${window.location.href}`)}`, "_blank")
                  },
                  { 
                    icon: <Facebook className="w-6 h-6" />, 
                    label: "Facebook", 
                    color: "bg-blue-700",
                    action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank")
                  },
                  { 
                    icon: <Twitter className="w-6 h-6" />, 
                    label: "Twitter", 
                    color: "bg-sky-500",
                    action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Confira o ${sharing.product.title} na Dfiltros!`)}&url=${encodeURIComponent(window.location.href)}`, "_blank")
                  },
                  { 
                    icon: <Mail className="w-6 h-6" />, 
                    label: "Email", 
                    color: "bg-gray-600",
                    action: () => window.location.href = `mailto:?subject=${encodeURIComponent(`Dfiltros: ${sharing.product.title}`)}&body=${encodeURIComponent(`Confira este produto: ${window.location.href}`)}`
                  }
                ].map((item, i) => (
                  <button 
                    key={i} 
                    onClick={item.action}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-black/20`}>
                      {item.icon}
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-widest text-gray-500">{item.label}</span>
                  </button>
                ))}
              </div>

              <button 
                onClick={() => copyToClipboard(window.location.href)}
                className="w-full py-4 glass hover:bg-white/10 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 border border-white/5"
              >
                <Link2 className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Copiar Link</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
