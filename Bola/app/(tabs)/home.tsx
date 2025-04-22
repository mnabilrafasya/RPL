// app/(tabs)/home.tsx
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";

import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>4-2-3-1</Text>
        <Ionicons name="search" size={24} color="white" />
      </View>

      {/* Date Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dateTabs}
      >
        {["LIVE", "SAT", "SUN", "MON", "TUE"].map((day, index) => (
          <TouchableOpacity key={index} style={styles.dateTab}>
            <Text style={styles.dateTabText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* My Favourites */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Favourites</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            "Add",
            "Premier League",
            "UCL",
            "Real Madrid",
            "Barcelona",
            "Atletico Madrid",
            "Manchester United",
          ].map((fav, i) => (
            <TouchableOpacity key={i} style={styles.favIcon}>
              <View style={styles.favCircle}>
                <Text style={styles.favText}>⚽</Text>
              </View>
              <Text style={styles.favLabel}>{fav}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* UCL Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>UCL</Text>
        <MatchItem teamA="DORTMUND" teamB="BARCELONA" time="02:00" />
        <MatchItem teamA="ASTON VILLA" teamB="PSG" time="02:00" />
      </View>

      {/* Liga Profesional Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Liga Profesional</Text>
        <MatchItem
          teamA="VELEZ SARSFIELD"
          teamB="SARMIENTO"
          status="FULL-TIME"
          score="0 - 1"
        />
      </View>

      {/* Premier League Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Premier League</Text>
        <MatchItem teamA="LIVERPOOL" teamB="CHELSEA" time="02:00" />
        <MatchItem teamA="MANCHESTER CITY" teamB="ARSENAL" time="02:00" />
        <MatchItem teamA="TOTTENHAM" teamB="NEWCASTLE" time="02:00" />
      </View>

      {/* La Liga Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>La Liga</Text>
        <MatchItem teamA="REAL MADRID" teamB="ATLETICO MADRID" time="02:00" />
        <MatchItem teamA="BARCELONA" teamB="SEVILLA" time="02:00" />
        <MatchItem teamA="VALENCIA" teamB="REAL BETIS" time="02:00" />
      </View>

      {/* Serie A Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Serie A</Text>
        <MatchItem teamA="JUVENTUS" teamB="INTER MILAN" time="02:00" />
        <MatchItem teamA="AC MILAN" teamB="NAPOLI" time="02:00" />
        <MatchItem teamA="ROMA" teamB="LAZIO" time="02:00" />
      </View>

      {/* Bundesliga Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bundesliga</Text>
        <MatchItem
          teamA="BAYERN MUNICH"
          teamB="BORUSSIA DORTMUND"
          time="02:00"
        />
        <MatchItem teamA="RB LEIPZIG" teamB="BAYER LEVERKUSEN" time="02:00" />
        <MatchItem teamA="VFB STUTTGART" teamB="HERTHA BERLIN" time="02:00" />
      </View>
    </ScrollView>
  );
}

// Komponen kecil untuk item pertandingan
function MatchItem({ teamA, teamB, time, status, score }: any) {
  return (
    <View style={styles.matchItem}>
      <View style={styles.teamBox}>
        <Image
          source={require("../../assets/images/Barcelona.png")}
          style={styles.teamLogo}
        />
        <Text style={styles.matchText}>{teamA}</Text>
      </View>

      <View style={styles.centerBox}>
        <Text style={styles.matchMiddle}>{score || time}</Text>
        {status && <Text style={styles.matchStatus}>{status}</Text>}
      </View>

      <View style={[styles.teamBox, styles.teamBoxRight]}>
        <Text style={styles.matchText}>{teamB}</Text>
        <Image
          source={require("../../assets/images/Barcelona.png")}
          style={styles.teamLogo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? 32 : 0, // tambahkan padding atas untuk status bar
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  logo: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  dateTabs: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dateTab: {
    backgroundColor: "#1a1a1a",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginRight: 8,
  },
  dateTabText: {
    color: "white",
    fontWeight: "500",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  favIcon: {
    alignItems: "center",
    marginRight: 16,
  },
  favCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  favText: {
    fontSize: 24,
    color: "white",
  },
  favLabel: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    maxWidth: 60,
  },
  matchItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  teamBox: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  teamBoxRight: {
    justifyContent: "flex-end",
  },
  teamLogo: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  matchText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    flexShrink: 1, // biar teks panjang nggak maksa lebar
  },
  centerBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  matchMiddle: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  matchStatus: {
    fontSize: 10,
    color: "gray",
    textAlign: "center",
  },
});
