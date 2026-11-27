# Site PIBID — Matemática e Computação (UPE)

Base em **HTML + CSS + um pouco de JavaScript**, sem frameworks e sem instalação.
Baseado no design do Figma "SITE PIBID" (*Portal PIBID • Alternativa em carrossel*).

Para ver o site, abra o `index.html` no navegador.

## Estrutura

```
pibid-site/
├── index.html                    ← página (um comentário marca cada bloco)
├── css/
│   ├── main.css                  ← lista todos os arquivos CSS (@import)
│   ├── base/
│   │   ├── variables.css         ← cores, fontes, raios e larguras (tokens do Figma)
│   │   ├── reset.css
│   │   └── typography.css
│   ├── layout/container.css      ← largura e margens do conteúdo
│   └── components/               ← UM arquivo por bloco da página
│       ├── header.css            cabeçalho com logos
│       ├── hero.css              apresentação
│       ├── eyebrow.css           rótulo pequeno acima dos títulos
│       ├── carousel.css          seletores, trilho e controles do carrossel
│       ├── activity-slide.css    visual de cada atividade (slide)
│       ├── photo-gallery.css     galeria de 3 fotos
│       └── footer.css            rodapé
├── js/carousel.js                ← carrossel (não precisa editar)
├── templates/slide-atividade.html← modelo para copiar
└── assets/img/
    ├── logo-upe.png, logo-pibid.png, logo-capes.png
    └── atividades/<nome-da-escola>/   ← fotos de cada escola
```

## Como adicionar a atividade da sua escola

1. Abra `templates/slide-atividade.html` e copie todo o conteúdo.
2. Cole no `index.html`, **logo antes** do comentário `FIM DOS SLIDES`.
3. Troque os textos marcados com ✏️ (nome do grupo, título, escola, descrição, fotos).
4. Coloque suas fotos em `assets/img/atividades/nome-da-escola/` (sem espaços nem acentos no nome do arquivo).

Pronto: o botão "05 Grupo 5", o contador `05 / 05`, as bolinhas e as setas são criados
automaticamente pelo `js/carousel.js`, e o número do slide também.

> Dois textos fixos mencionam "quatro grupos" (parágrafo da apresentação e título
> "Quatro grupos, muitas descobertas."). Se o total mudar, atualize esses dois textos no `index.html`.

## Como adicionar um novo bloco à página

1. Crie `css/components/nome-do-bloco.css`.
2. Adicione `@import url("components/nome-do-bloco.css");` em `css/main.css`.
3. No `index.html`, crie a seção com um comentário de bloco, no mesmo formato dos existentes:
   `<!-- ===================== BLOCO: NOME ===================== -->`

## Convenções

- **Nomes de classe no padrão BEM:** `bloco`, `bloco__elemento`, `bloco--variação`
  (ex.: `slide__title`, `photo--main`).
- **Cores, fontes e medidas ficam só em `css/base/variables.css`.** Não escreva `#176450`
  direto nos componentes; use `var(--color-green-700)`.
- Um componente = um arquivo CSS. Evite editar o CSS de um bloco que não é seu.
- Toda `<img>` precisa de `alt` descrevendo a foto.
- Para evitar conflitos no Git, cada pessoa deve mexer apenas no próprio `<article class="slide">`.

## Logos

Os três arquivos em `assets/img/logo-*.png` são **provisórios** (caixas com o nome).
Exporte os logos reais do Figma (nós *Logo UPE*, *Logo PIBID* e *Logo CAPES*, em PNG @2x)
e substitua os arquivos mantendo os mesmos nomes.
