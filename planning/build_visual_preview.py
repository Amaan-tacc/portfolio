"""Generate the standalone image-led studio preview from the actual portfolio."""
from pathlib import Path
import json

root = Path(__file__).resolve().parents[1]
source = (root/'docs/content.js').read_text(encoding='utf-8')
content = json.loads(source[source.index('{'):].strip().rstrip(';'))
source = (root/'docs/image-assets.js').read_text(encoding='utf-8')
assets = json.loads(source[source.index('{'):].strip().rstrip(';'))
copy = {
 'brand-01': ('WestVue', 'Brand identity', 'Identity, guidelines and applications.', 'Create a visual identity that stays consistent across different formats.', 'A logo system, typography, colour guidance and application designs.'),
 'lead-01': ('Creating Talents', 'Books & educational design', 'Covers, interiors and learning materials.', 'Coordinate a collection of educational books and communication materials for a returning client.', 'Brief clarification, creative direction, page reviews, revisions and final delivery across the publishing collection.'),
 'pack-01': ('FAR Organics', 'Packaging', 'A family of oils, clays and gels.', 'Give multiple product variants a shared label structure and distinct identities.', 'Related label designs with a repeated hierarchy, individual colours and ingredient imagery.'),
 'social-01': ('Copacetic Connections', 'Brand identity', 'A consulting identity with a broader audience.', 'Move beyond craft-beer associations while keeping the client’s preferred colours.', 'A new identity and applications developed around the chosen visual direction.'),
 'enno-01': ('EnnoShi', 'Brand identity & packaging', 'From identity to product applications.', 'Carry a product identity across packaging and business communication.', 'An identity, guidelines and application mockups across cartons, cards and signage.'),
 'print-01': ('De Fontein', 'Print & educational design', 'School projects, posters and banners.', 'Communicate teaching topics and school project briefs at different print sizes.', 'A coordinated approach to banners, classroom posters and related school materials.'),
 'bluoom-01': ('Bluoom', 'Brand identity', 'Stationery, merchandise and signage.', 'Apply a recognisable identity across different sizes and surfaces.', 'A logo and colour system explored through business cards, caps and conceptual signage.'),
 'menu-01': ('Café menus', 'Print & information design', 'Categories, descriptions and prices.', 'Make a varied drinks menu easy to navigate in a limited space.', 'Related menu layouts with consistent hierarchy, aligned prices and clear categories.'),
 'digital-01': ('QuickGrade', 'Product coordination', 'An assessment platform for teachers and students.', 'Connect uploads, grading, results and review in one assessment workflow.', 'Requirements, client feedback and workflow reviews coordinated with a UI designer and two developers.'),
 'technical-01': ('Technical guides', 'Document design', 'Product overviews and reference material.', 'Organise supplied technical content into readable product and setup documents.', 'Layouts for NGINX cloud-product material, retaining the supplied technical content and product identities.')
}
projects=[]
for id, values in copy.items():
 p=next(p for p in content['projects'] if p['id']==id)
 title,category,note,brief,delivery=values
 projects.append(dict(id=id,title=title,category=category,note=note,brief=brief,delivery=delivery,image=p['image'],role=p['role'],gallery=p['gallery']))
template=(root/'planning/interactive-studio.template.html').read_text(encoding='utf-8')
html=template.replace('__DATA__',json.dumps(projects,ensure_ascii=False).replace('<','\\u003c')).replace('__ASSETS__',json.dumps(assets,ensure_ascii=False).replace('<','\\u003c'))
target=root/'planning/studio-direction.html'
target.write_text(html,encoding='utf-8')
output=Path(r'C:\Users\hafiz\Documents\Codex\2026-10-27\con\outputs\Amaanity_Studio_Planning_Preview.html')
output.write_text(html,encoding='utf-8')
print(f'Built {len(projects)} projects, {sum(len(p["gallery"]) for p in projects)} real views, 2 reserved areas: {output}')
