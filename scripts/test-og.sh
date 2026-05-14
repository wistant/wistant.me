#!/usr/bin/env bash
# ============================================================
# test-og.sh — OG metadata audit for wistant.me
# Usage: bash scripts/test-og.sh [base_url]
# Default: http://localhost:3000
# ============================================================

BASE="${1:-http://localhost:3000}"
PASS=0
FAIL=0

check() {
  local label="$1"
  local url="$2"
  local expected="$3"   # substring to assert (optional)

  printf "\n\033[1;34m▶ %-40s\033[0m %s\n" "$label" "$url"

  local html
  html=$(curl -sL --max-time 10 "$url")

  if [[ -z "$html" ]]; then
    printf "  \033[1;31m✗ Could not reach URL (timeout or server error)\033[0m\n"
    ((FAIL++))
    return
  fi

  # Extract OG tags
  local og_title og_desc og_img tw_img og_url
  og_title=$(echo "$html" | grep -oP '(?<=og:title" content=")[^"]+' | head -1)
  og_desc=$(echo "$html"  | grep -oP '(?<=og:description" content=")[^"]+' | head -1)
  og_img=$(echo "$html"   | grep -oP '(?<=og:image" content=")[^"]+' | head -1)
  tw_img=$(echo "$html"   | grep -oP '(?<=twitter:image" content=")[^"]+' | head -1)
  og_url=$(echo "$html"   | grep -oP '(?<=og:url" content=")[^"]+' | head -1)

  printf "  \033[0;36mog:title\033[0m       → %s\n" "${og_title:-⚠️  MISSING}"
  printf "  \033[0;36mog:description\033[0m → %s\n" "${og_desc:-⚠️  MISSING}"
  printf "  \033[0;36mog:image\033[0m       → %s\n" "${og_img:-⚠️  MISSING}"
  printf "  \033[0;36mtwitter:image\033[0m  → %s\n" "${tw_img:-⚠️  MISSING}"
  printf "  \033[0;36mog:url\033[0m         → %s\n" "${og_url:-⚠️  MISSING}"

  # Assertion
  if [[ -n "$expected" ]]; then
    if echo "$og_img" | grep -q "$expected"; then
      printf "  \033[1;32m✓ Image contains '%s'\033[0m\n" "$expected"
      ((PASS++))
    else
      printf "  \033[1;31m✗ Expected image to contain '%s', got: %s\033[0m\n" "$expected" "${og_img:-EMPTY}"
      ((FAIL++))
    fi
  else
    if [[ -n "$og_img" ]]; then
      printf "  \033[1;32m✓ OG image is present\033[0m\n"
      ((PASS++))
    else
      printf "  \033[1;31m✗ No og:image found\033[0m\n"
      ((FAIL++))
    fi
  fi
}

echo ""
echo "============================================================"
echo "  🧪  OG Audit — $BASE"
echo "============================================================"

# ── Pages statiques ──────────────────────────────────────────
check "Home (EN)"                          "$BASE/en"                                                            "og.png"
check "Home (FR)"                          "$BASE/fr"                                                            "og.png"
check "About"                              "$BASE/en/about"                                                      "og.png"
check "Blog index"                         "$BASE/en/blog"                                                       "og.png"
check "Projects index"                     "$BASE/en/projects"                                                   "og.png"
check "Certifications index"               "$BASE/en/certifications"                                             "og.png"
check "Hackathons"                         "$BASE/en/hackathons"                                                 "og.png"

# ── Articles de blog ─────────────────────────────────────────
check "Blog: The AI Cloud"                 "$BASE/en/blog/the-ai-cloud"                                         "unsplash"
check "Blog: 7 Principles"                 "$BASE/en/blog/7-principles-of-rich-web-applications"                "unsplash"

# ── Projets ──────────────────────────────────────────────────
check "Project: Interlock"                 "$BASE/en/projects/interlock"                                        "/portfolio/interlock"
check "Project: Propellent"                "$BASE/en/projects/propellent"                                       "/portfolio/propellent"
check "Project: Swarm AI"                  "$BASE/en/projects/swarm-ai-blog-writer"                             "/portfolio/sleek-ai"
check "Project: My Portfolio"              "$BASE/en/projects/my-portfolio"                                     "/portfolio/portfolio"

# ── Certifications ───────────────────────────────────────────
check "Cert: AWS Security Specialty"       "$BASE/en/certifications/aws-security-specialty"                     "/certifications/"
check "Cert: AWS DevOps Professional"      "$BASE/en/certifications/aws-devops-professional"                    "/certifications/"
check "Cert: AWS SAA"                      "$BASE/en/certifications/aws-solutions-architect-associate"          "/certifications/"
check "Cert: AWS SAP"                      "$BASE/en/certifications/aws-solutions-architect-professional"       "/certifications/"
check "Cert: Azure SAE"                    "$BASE/en/certifications/azure-solutions-architect-expert"           "/certifications/"
check "Cert: AWS Database"                 "$BASE/en/certifications/aws-certified-database-specialty"           "/certifications/"

echo ""
echo "============================================================"
printf "  Results: \033[1;32m%d passed\033[0m / \033[1;31m%d failed\033[0m\n" "$PASS" "$FAIL"
echo "============================================================"
echo ""
