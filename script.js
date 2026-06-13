const sections=document.querySelectorAll('.section');
const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add('active');
}
});
});
sections.forEach(s=>{
s.classList.add('reveal');
observer.observe(s);
});
